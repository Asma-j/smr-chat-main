import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MsProvider, UserCreateDto } from '@mslibs/shared/front-back/user/dtos';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mslibs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss','../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showSpinner = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      comfirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.showSpinner = true;
    // @todo compleate profile
    const condidateUser = {
       email : this.registerForm.controls.email.value,
       password: this.registerForm.controls.password.value,
       firstName : this.registerForm.controls.firstName.value,
       lastName : this.registerForm.controls.lastName.value,
       username: this.registerForm.controls.firstName.value + ' ' + this.registerForm.controls.lastName.value, 
       provider : MsProvider.LOCAL
    } as UserCreateDto;
    this.authService
      .register(condidateUser)
      .pipe(first())
      .subscribe(
        data => {
          this.error = '';
          this.router.navigate(['public/login']);
        },
        error => {
          this.error = error;
          console.error(error);
          this.showSpinner = false;
        }
      );
  }
}
