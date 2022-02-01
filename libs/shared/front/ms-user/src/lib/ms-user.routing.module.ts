import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './containers/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  /** collection profile*/
  { path: 'profile', component: ProfileComponent },
  //{ path: '**', redirectTo: 'profile' }, //auto redirect to page not found in app-routing
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsUserRoutingModule { }
