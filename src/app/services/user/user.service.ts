import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SignupUserRequest } from "../../interfaces/user/signup-user-request";
import { Observable } from "rxjs";
import { SignupUserResponse } from "../../interfaces/user/signup-user-response";
import { AuthRequest } from "../../interfaces/user/auth/auth-request";
import { AuthResponse } from "../../interfaces/user/auth/auth-response";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  signupUser(resquestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(`${this.API_URL}/user`, resquestDatas)
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas)
  }

  isLoggedIn(): boolean{
    const JWT_TOKEN = this.cookieService.get('USER_INFO')
    return !!JWT_TOKEN
  }
}
