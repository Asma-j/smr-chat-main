import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/angular';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule, MsCoreModule, SharedModule } from '@mslibs/front-share';
import { MsThemeModule } from '@mslibs/ms-mat-theme';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { jwtInterceptorProvider, errorInterceptorProvider, redirectInterceptorProvider, MsAuthModule } from '@mslibs/ms-auth';
import { DatePipe } from '@angular/common';

import { MsLayoutModule } from '@mslibs/ms-layout';
import { ROOT_REDUCERS, metaReducers, MsRouterSerializer } from '@mslibs/ms-route';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserStoreModule } from '@mslibs/ms-user';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    AppComponent,
    NotfoundpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    HttpClientModule,
    MsCoreModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    MsThemeModule,
    MsLayoutModule,
    //init stores 
    UserStoreModule,
    //to check
    MsAuthModule.forRoot(
      {
        appIcon: 'dynamic_form',
        appName: 'Profily'
        ,appPhotoUrl: ''
      }),
    // ngrx router config
    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ serializer: MsRouterSerializer }),
    EffectsModule.forRoot([]),
    // disable storedevtool in prod
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    jwtInterceptorProvider,
    errorInterceptorProvider,
    redirectInterceptorProvider,
    DatePipe,
    { provide: 'environment', useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
