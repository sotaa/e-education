import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IAuthResult, IAuthData } from "./models";
import { tap, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IAuthState } from "./reducers/auth-state.interface";
import { ChangeUser } from "./reducers/actions";
import { IUser } from "./models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private authStore: Store<IAuthState>) {
    const savedUserData = this.getSavedAuthResult();
    if (savedUserData) {
      this.authStore.dispatch(new ChangeUser(savedUserData));
      this.rememberCurrentUser();
    }
  }

  login(username: string, password: string) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.login, { username, password })
      .pipe(tap((res) => this.setAuthResult(res)));
  }

  register(authData: IAuthData) {
    return this.http
      .post<IAuthResult>(environment.identityUrls.register, authData)
      .pipe(tap((res) => this.setAuthResult(res)));
  }

  private getSavedAuthResult() {
    const localAuthResult =
      sessionStorage.getItem("authResult") ||
      sessionStorage.getItem("authResult");
    return localAuthResult ? JSON.parse(localAuthResult) : undefined;
  }

  getCurrentUser() {
    return this.authStore.select((a: any) => a.authState.authResult);
  }

  private setAuthResult(user: IAuthResult) {
    this.authStore.dispatch(new ChangeUser(user));
    sessionStorage.setItem("authResult", JSON.stringify(user));
  }

  logout() {
    sessionStorage.clear();
    return this.authStore.dispatch(new ChangeUser(undefined));
  }

  rememberCurrentUser() {
    this.getCurrentUser().subscribe((authResult) => {
      localStorage.setItem("authResult", JSON.stringify(authResult));
    });
  }
}
