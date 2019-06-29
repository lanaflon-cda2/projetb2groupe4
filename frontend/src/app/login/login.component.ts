import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Login } from "../entity/login";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loginResult: JSON = JSON;
  public login: Login = new Login(null, null);
  submitted = false;

  public userLogged: Boolean =
    localStorage.getItem("user") === null ? false : true;

  constructor(
    private fb: FormBuilder,
    private readonly loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      utilisateurMail: ["", [Validators.required, Validators.email]],
      utilisateurMotDePasse: ["", [Validators.required, Validators.pattern("")]]
    });

    console.log(this);
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.login.utilisateurMail = this.loginForm.value["utilisateurMail"];
      this.login.utilisateurMotDePasse = this.loginForm.value[
        "utilisateurMotDePasse"
      ];

      console.log(this);

      this.loginService
        .getBienByParams(this.login)
        .subscribe(
          response => (
            (this.loginResult = response),
            localStorage.setItem("user", JSON.stringify(response))
          ),
          error => console.error("Error!", error)
        );
      console.log("Success!" + this.loginResult);
      /*localStorage.setItem(
        "User",
        this.loginResult.stringify({ test: this.loginResult })
      );*/
      this.router.navigate(["/home"]);
    } else {
      this.toastr.error("Adresse mail ou mot de passe incorrect", "Error");
    }
    console.log(localStorage);
  }

  logout() {
    console.log("Tentative de déconnexion");

    localStorage.removeItem("user");
    this.router.navigate(["/home"]);
  }
}
