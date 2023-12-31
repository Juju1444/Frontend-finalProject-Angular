import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _AuthService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._AuthService.getAuthToken();

   if (token) {
    // If we have a token, we set it to the header
    request = request.clone({
       setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type':'multipart/form-data',
        'Accept': 'application/json',
      }
    });
  }else{
    request = request.clone({
      setHeaders: {
       'Content-Type':'multipart/form-data',
       'Accept': 'application/json',
     }
   });
  }
    
    return next.handle(request);
  }




  
}
