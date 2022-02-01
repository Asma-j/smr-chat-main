import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showSpinner = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/private';
    // reset login status
    //console.log('ngOnInit login page')
    this.authenticationService.logout(this.returnUrl);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.showSpinner = true;
    this.authenticationService
      .login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data){
            this.error = '';
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
          this.error = error;
          this.showSpinner = false;
        }
      );
  }

  googleLogin(){
    const google_auth_uri = '/api/auth/google'
    this.document.location.href = google_auth_uri;
  }

  facebookLogin(){
    const fb_auth_uri = '/api/auth/facebook'
    this.document.location.href = fb_auth_uri;
  }

  openFSnackBar(){
    this._snackBar.open("Comming soon ...", "Facebook", {
      duration: 2000,
    });
  }
  
}
