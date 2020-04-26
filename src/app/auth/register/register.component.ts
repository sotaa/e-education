import { AuthData } from "./../models";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("f") form: NgForm;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isLoading: boolean;
  errorMessage: string;
  authData: AuthData;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authData.email = this.email;
      this.authData.password = this.password;
      this.authData.firstName = this.firstName;
      this.authData.lastName = this.lastName;

      this.authService
        .register(this.authData)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(
          (res) => {
            this.router.navigate(["/"]);
          },
          (errorResponse) => {
            this.errorMessage = errorResponse.error.message || "UNKNOWN_ERROR";
          },
        );
    } else {
      this.errorMessage = "!فیلدی را خالی نگذارید";
    }
  }
}
