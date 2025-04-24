import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  // request : yapacağımız istek
  // next : pakete token koyup göndermemizi sağlayacak
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    let newRequest: HttpRequest<any>;
    newRequest = request.clone({
      // Postman'deki header'ı oluşturuyoruz
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
    // burda artık yaptığımız istek postman'deki gibi header ve body'si olan bi istek
    return next.handle(newRequest);
  }
}
