import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthStartComponent } from "./auth/auth-start/auth-start.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  { path: "auth", pathMatch: "full", redirectTo: "login" },
  {
    path: "auth",
    component: AuthStartComponent,
    children: [
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
    ],
  },

  {
    path: "",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
