import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginModel from '../models/login.model';
import { ConfigModel } from '../models/config.model';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
  
})
export class AuthService {

  constructor(private http: HttpClient,private tokenService:TokenService) { }

  public jwtHelper:JwtHelperService = new JwtHelperService();


  login(login: LoginModel): Observable<any> {
    return this.http.post(ConfigModel.loginUrl, login).pipe(
      map((response: any) => {
        if (response && response.token) {
          this.tokenService.setToken(response.token);
        }
        return response;
      })
    );
  }
  logout(): void {
    this.tokenService.removeToken();
  }
 
  isLoggedIn() {
    const token = this.tokenService.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole() {
    const token:string|null = this.tokenService.getToken();
    if(token != null)
    {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken ? decodedToken.role : null;
    }
    return null;
  }
  hasRole(role:string) {
    const token:string|null = this.tokenService.getToken();
    if(token != null)
    {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken ? decodedToken.role == role : false;
    }
    return false;
  }
  getUserName()
  {
    const token:string|null = this.tokenService.getToken();
    if(token != null)
    {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken ? decodedToken.unique_name : null;
    }
    return null;
  }
}
