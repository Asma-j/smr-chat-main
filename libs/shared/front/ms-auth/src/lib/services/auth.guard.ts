import { Injectable } from '@angular/core';
import { Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, UrlSegment, Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root', })
export class NgAuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    const currentAccessToken = this.authService.currentAccessToken;
    //console.log('NgAuthGuard : checkLogin : currentAccessToken', currentAccessToken);
    if (currentAccessToken) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.authService.logout(url);
      return false;
    }

  }

}