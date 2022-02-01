import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavMenuComponent } from './components/side-nav-menu/side-nav-menu.component'
import { LayoutService } from './services/layout.service';
import { RouterModule } from '@angular/router';
import { NavMenuItemComponent } from './components/side-nav-menu/nav-menu-item/nav-menu-item.component';
import { SharedModule, MaterialModule } from '@mslibs/front-share';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    LayoutService
  ],
  declarations: [
    SideNavMenuComponent,
    NavMenuItemComponent
  ],
  exports: [SideNavMenuComponent,NavMenuItemComponent]
})
export class MsLayoutModule { }
