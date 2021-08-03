import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // Connection Variables 
  public static URL:string="http://localhost/SICTestApi/public/api/";
  public static headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // LocalStorage Variables
  public static tokenName : string = "accessToken";
  public static currentUserName : string = "currentUser";
  public static productsName : string = "cartProducts";

}
