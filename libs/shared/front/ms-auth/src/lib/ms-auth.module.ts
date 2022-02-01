import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { SharedModule, MaterialModule } from '@mslibs/front-share';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MsAuthRoutingModule } from './ms-auth.module-routing';
import { RegisterComponent } from './containers/register/register.component';
import { PublicFormsCardComponent } from './components/public-forms-card/public-forms-card.component';
import { AppConfigService } from './services/app-config.service';

@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MsAuthRoutingModule
  ],
  declarations: [ 
    LoginComponent, 
    RegisterComponent, 
    PublicFormsCardComponent 
  ],
  providers: []
})
export class MsAuthModule {
  static forRoot(config: AppConfigService): ModuleWithProviders<MsAuthModule> {
    return {
      ngModule: MsAuthModule,
      providers: [
        {provide: AppConfigService, useValue: config }
      ]
    };
  }
}
