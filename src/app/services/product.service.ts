import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { ProductInterface } from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http : HttpClient
  ) { }

  getAllProducts():Observable<any>{
    let customUrl = ConfigService.URL+'products';
    return this.http.get(customUrl,{headers: this.headers});
  }

  createProduct(dataForm:ProductInterface):Observable<any>{
    let customUrl = ConfigService.URL+'products';
    return this.http.post(customUrl,dataForm,{headers: this.headers});
  }

  getProduct(id:number) :Observable<any>{
    let customUrl = ConfigService.URL+'products/'+id;
    return this.http.get(customUrl,{headers: this.headers})
  }

  updateProduct(id:number,dataForm:ProductInterface) : Observable<any>{
    let customUrl = ConfigService.URL+'products/'+id;
    return this.http.put(customUrl,dataForm,{headers: this.headers});
  }

  deleteProduct(id:number):Observable<any>{
    let customUrl = ConfigService.URL+'products/'+id;
    return this.http.delete(customUrl,{headers: this.headers});
  }
}
