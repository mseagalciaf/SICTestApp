import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('http interceptor');

    const reqClone = req.clone({
      setHeaders: {Authorization : `Bearer ${this.getToken()}`}
    });
    return next.handle(reqClone);
  }

  getToken(){
    return JSON.parse(localStorage.getItem('accessToken'));
  }
}
