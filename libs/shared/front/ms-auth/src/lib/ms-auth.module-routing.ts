import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { LoginGoogleSuccessComponent } from './containers/login-google-success/login-google-success.component';
import { LoginGoogleFailureComponent } from './containers/login-google-failure/login-google-failure.component';
import { LoginFacebookSuccessComponent } from './containers/login-facebook-success/login-facebook-success.component';

// import { LoginRedirect } from './services/login-redirect.service';
// import { PublicComponent } from './public.component';
// import { RegisterComponent } from './register/register.component';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
     { path: '', redirectTo: 'login', pathMatch: 'full' },
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     // { path: 'forget_password', component : ForgetPasswordComponent }
     { path: 'glogin/success/:jwt', component: LoginGoogleSuccessComponent  },
     { path: 'glogin/failure', component:  LoginGoogleFailureComponent },
     { path: 'flogin/success/:jwt', component: LoginFacebookSuccessComponent  },
     { path: 'flogin/failure', component:  LoginGoogleFailureComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsAuthRoutingModule { }
