import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "frontend";

  constructor(private router: Router) {}

  public userLogged: Boolean =
    localStorage.getItem("user_token") === null ? false : true;

  ngOnInit() {
    // this.router.navigate(["/home"]);
  }
}
