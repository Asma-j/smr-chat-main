import { Component, OnInit } from '@angular/core';
import { switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MsRouterState, getCurrentUrl } from '@mslibs/ms-route';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mslibs-login-google-success',
  templateUrl: './login-google-success.component.html',
  styleUrls: ['./login-google-success.component.scss']
})
export class LoginGoogleSuccessComponent implements OnInit {

  constructor(
    private routerStore: Store<MsRouterState>,
    private router: Router,
    private authenticationService : AuthService
  ) { }


  ngOnInit() {
    this.loadGoogleJwt().pipe(first()).subscribe(
      res => {
        this.authenticationService.successLogin(res);
        this.router.navigate(['/private']);
      }
    );
  }

  loadGoogleJwt() {
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
