import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import { UserStoreService } from '../../store/user.service.store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mslibs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  error = '';
  public profile$ : Observable<UserUpdateDto>;

  constructor(
    private formBuilder: FormBuilder,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', Validators.required],
    });
    this.profile$ = this.userStoreService.getCurrentUser().pipe(
      tap(res => {
        if(res) this.registerForm.patchValue(res)
      })
    );
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const condidateUser = {
       email : this.registerForm.controls.email.value,
       firstName : this.registerForm.controls.firstName.value,
       lastName : this.registerForm.controls.lastName.value,
       username: this.registerForm.controls.firstName.value + ' ' + this.registerForm.controls.lastName.value, 
    } as UserUpdateDto;
    this.userStoreService.updateCurrentUser(condidateUser);
  }

}
