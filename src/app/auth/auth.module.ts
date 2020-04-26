import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthStartComponent } from "./auth-start/auth-start.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./reducers";

@NgModule({
  declarations: [AuthStartComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      authState: authReducer,
    }),
  ],
  exports: [StoreModule],
})
export class AuthModule {}
