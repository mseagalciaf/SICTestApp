import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { LoginInterface } from '../interfaces/login-interface';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http : HttpClient
  ) { }

  login(credentials:LoginInterface):Observable<any>{
    let customUrl = ConfigService.URL + "login";
    return this.http.post(customUrl,credentials, {headers: this.headers})
  }

  logout():Observable<any>{
    let customUrl = ConfigService.URL+"logout";
    let currentUser=localStorage.getItem("currentUser");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    
    return this.http.post(customUrl,currentUser, {headers: this.headers});
       
  }

  setToken(token:string):void {
    let token_string=JSON.stringify(token);
    localStorage.setItem(ConfigService.tokenName,token_string)
  }

  setCurrentUser(user:any){
    let user_string= JSON.stringify(user);
    localStorage.setItem(ConfigService.currentUserName,user_string)
  }

  getCurrentUser(){
    let user:UserInterface = JSON.parse(localStorage.getItem(ConfigService.currentUserName));
    return user;
  }

  public isLogined(){
    let customUrl = ConfigService.URL+"isLogined";
    if (localStorage.getItem(ConfigService.tokenName)) {
      return this.http.get(customUrl,{headers:this.headers}).subscribe(
        resp => {
          return true;
        },
        error => {
          return false;
        }
      );
    }
  }
}
