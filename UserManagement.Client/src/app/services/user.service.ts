import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import LoginModel from '../models/login.model';
import { ConfigModel } from '../models/config.model';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { DataTablesResponse } from '../models/datatableresponse.model';
import UserModel from '../models/user.model';

@Injectable({
  providedIn: 'root'
  
})
export class UserService {

  constructor(private http: HttpClient) { }

  public jwtHelper:JwtHelperService = new JwtHelperService();


  getUsers(dataTablesParameters:any): Observable<any> {
    return this.http.post<DataTablesResponse>(ConfigModel.getUsersUrl,dataTablesParameters);
  }

  addUser(userObj:UserModel): Observable<any> {
    return this.http.post<DataTablesResponse>(ConfigModel.addUserUrl,userObj);
  }
  getUser(id:string|null):Observable<any>{
    return this.http.get(ConfigModel.getUserUrl+id);
  }
  updateUser(userObj:UserModel): Observable<any> {
    return this.http.post(ConfigModel.updateUserUrl,userObj);
  }
  deleteUser(id:string|null): Observable<any> {
    return this.http.get(ConfigModel.deleteUserUrl+id);
  }
}
