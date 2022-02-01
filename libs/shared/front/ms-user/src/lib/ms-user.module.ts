import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, MaterialModule } from '@mslibs/front-share';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserStoreModule } from './store/user.store.module';
import { MsUserRoutingModule } from './ms-user.routing.module';
import { ProfileComponent } from './containers/profile/profile.component';

@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserStoreModule,
    MsUserRoutingModule
  ],
  declarations:[
    ProfileComponent
  ]
})
export class MsUserModule { }
