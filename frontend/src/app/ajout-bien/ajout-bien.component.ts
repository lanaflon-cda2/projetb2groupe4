import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Bien } from "../entity/bien";
import { AjoutBienService } from "./ajout-bien.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Dependance } from "../entity/dependance";
import { Image } from "../entity/image";
import { Adresse } from "../entity/adresse";
import { Router } from "@angular/router";

@Component({
  selector: "app-ajout-bien",
  templateUrl: "./ajout-bien.component.html",
  styleUrls: ["./ajout-bien.component.css"]
})
export class AjoutBienComponent implements OnInit {
  public dependancesEnum: string[] = [
    "Aucune",
    "Piscine",
    "Garage",
    "jardin",
    "Sous sol"
  ];
  public listeBienType: string[] = ["Maison", "Appartement"];

  ajoutBienForm: FormGroup;
  submitted = false;
  bien: Partial<Bien> = new Object();
  adresse: Partial<Adresse> = new Object();
  public dependances: Dependance[];
  public imagesBien: Image[];
  public dependancesBien: Image[];
  public nbImagesBien: number[] = [];
  villes: [] = [];

  constructor(
    private fb: FormBuilder,
    private readonly ajoutBienService: AjoutBienService,
    private router: Router
  ) {}

  /*
  ajoutBien = new Bien(
    "Maison",
    "https://v.seloger.com/s/crop/310x225/visuels/0/m/l/4/0ml42xbt1n3itaboek3qec5dtskdgw6nlscu7j69k.jpg",
    2,
    "Dans lotissement fermé, très bien entretenu, datant des années 2000, à proximité de la gare de la Blancarde dans le 12ème arrondissement. Belle villa indépendante de 138m² sur une parcelle de 450m².",
    300000,
    350000,
    "GARAGE",
    "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjgnNzTruPiAhW1A2MBHW3-C6YQjRx6BAgBEAU&url=https%3A%2F%2Fwww.seloger.com%2Fimmobilier%2Fachat%2Fimmo-chanteloup-les-vignes-78%2Fbien-maison%2F&psig=AOvVaw0pdo7wopjNzYMNpppUx-9r&ust=1560409001717179"
  );

  */
  ngOnInit() {
    if (localStorage.getItem("user_token") === null) {
      alert("Votre session a expiré !");
      location.reload();
      this.router.navigate(["/home"]);
    }

    this.ajoutBienForm = this.fb.group({
      bienEtage: ["", [Validators.required, Validators.min(0)]],
      bienDescriptif: ["", [Validators.required]],
      bienPrixMin: ["", [Validators.required, Validators.min(1)]],
      bienPrixDeVente: ["", [Validators.required, Validators.min(1)]],
      bienNbPiece: ["", [Validators.required, Validators.min(1)]],
      bienSuperficie: ["", [Validators.required, Validators.min(1)]],
      bienType: ["", [Validators.required]],
      bienTitre: ["", [Validators.required]],

      adresseCodePostal: ["", [Validators.required, Validators.minLength(1)]],
      adresseNomRue: ["", [Validators.required, Validators.minLength(1)]],
      adresseNumRue: ["", [Validators.required, Validators.minLength(1)]],
      adresseVilleId: ["", [Validators.required]]
    });

    this.ajoutBienService
      .getVilles()
      .subscribe(
        response => (this.villes = response),
        error => console.error("error!", error)
      );
  }

  get formControls() {
    return this.ajoutBienForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.ajoutBienForm.valid) {
      this.bien.bienEtage = this.ajoutBienForm.value["bienEtage"];
      this.bien.bienDescriptif = this.ajoutBienForm.value["bienDescriptif"];
      this.bien.bienPrixMin = this.ajoutBienForm.value["bienPrixMin"];
      this.bien.bienPrixDeVente = this.ajoutBienForm.value["bienPrixDeVente"];
      this.bien.bienNbPiece = this.ajoutBienForm.value["bienNbPiece"];
      this.bien.bienSuperficie = this.ajoutBienForm.value["bienSuperficie"];
      this.bien.bienType = this.ajoutBienForm.value["bienType"];
      this.bien.bienTitre = this.ajoutBienForm.value["bienTitre"];
      this.bien.bienEtat = "Non Vendu";

      this.adresse.adresseCodePostal = this.ajoutBienForm.value[
        "adresseCodePostal"
      ];
      this.adresse.adresseNomRue = this.ajoutBienForm.value["adresseNomRue"];
      this.adresse.adresseNumRue = this.ajoutBienForm.value["adresseNumRue"];
      this.adresse.adresseVilleId = this.ajoutBienForm.value["adresseVilleId"];

      this.ajoutBienService
        .postAjoutBien([this.bien, this.adresse])
        .subscribe(
          response => (
            console.log("Success!", response), this.redirect(response)
          ),
          error => console.error("Error!", error)
        );
    } else {
      alert("Veuillez completez le formulaire correctement");
    }
    console.log(this);
  }

  redirect(result) {
    if (result != null) {
      alert("Le bien a été créé !");
      this.router.navigate(["/profil"], { fragment: result.bienId });
    } else {
      alert("Erreur lors de la création du bien");
    }
  }
}
