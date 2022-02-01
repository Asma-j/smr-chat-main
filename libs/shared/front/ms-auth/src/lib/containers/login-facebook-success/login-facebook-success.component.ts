import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MsRouterState, getCurrentUrl } from '@mslibs/ms-route';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'mslibs-login-facebook-success',
  templateUrl: './login-facebook-success.component.html',
  styleUrls: ['./login-facebook-success.component.css']
})
export class LoginFacebookSuccessComponent implements OnInit {

  constructor(
    private routerStore: Store<MsRouterState>,
    private router: Router,
    private authenticationService : AuthService
  ) { }

  ngOnInit() {
    this.loadJwt().pipe(first()).subscribe(
      res => {
        //console.log('loadFacebookJwt', res);
        this.authenticationService.successLogin(res);
        this.router.navigate(['/private']);
      }
    );
  }

  loadJwt() {
    return this.routerStore.pipe(
      select(getCurrentUrl),
      switchMap(res => {
        if (res && res.params) {
          //console.log('loadGoogleJwt has params loadGoogleJwt res', res);
          return of(res.params.jwt)
        } else {
          return of(null)
        }
      }));
  }

}
