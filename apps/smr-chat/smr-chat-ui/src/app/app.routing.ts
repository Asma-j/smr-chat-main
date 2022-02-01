import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { NgAuthGuard } from '@mslibs/ms-auth';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'private', pathMatch: 'full' },
  { path: 'public', loadChildren: () => import('@mslibs/ms-auth').then(m => m.MsAuthModule) },
  { path: 'private',
    component: HomeComponent,
    canActivate: [NgAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'user' },
      { path: 'user', loadChildren: () => import('@mslibs/ms-user').then(m => m.MsUserModule) },
      { path: 'rooms', loadChildren: () => import('@mslibs/shared-front-chat').then(m => m.SharedFrontChatModule) }

    ]
  },
  { path: 'notfound',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '404' },
      { path: '404', component: NotfoundpageComponent }
    ]
  },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})
export class AppRoutingModule { }