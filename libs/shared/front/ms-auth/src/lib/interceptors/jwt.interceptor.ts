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
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentAccessToken = this.authenticationService.currentAccessToken;
    if (currentAccessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentAccessToken}`
        }
      });
    }else{
      // Jwt interceptor Not found AccessToken -> Auto logout in error NgAuthGuard
      // console.log('Jwt interceptor Not found AccessToken -> Auto logout NgAuthGuard ');
    }
    return next.handle(request);
  }
}

export const jwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
