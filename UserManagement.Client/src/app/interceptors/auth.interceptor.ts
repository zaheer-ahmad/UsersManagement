import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { SharedService } from '../shared.service';


@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService,private sharedService:SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    const lang = this.sharedService.lang;
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
                  .set('Accept-Language',lang)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}