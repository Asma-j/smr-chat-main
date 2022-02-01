import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HTTP_INTERCEPTORS
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  import { AuthService } from '../services/auth.service';
  
  @Injectable({
    providedIn: 'root'
  })
  export class MsRedirectInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) {}
    /** TODO if need */
    /**Intercet 302 request */
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(

      );
    }
  }
  
  export const redirectInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: MsRedirectInterceptor,
    multi: true
  };
  