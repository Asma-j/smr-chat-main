import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })
   // RouterModule // because we use <router-outlet> and routerLink
  ],
  exports : [MaterialModule]
})
export class MsCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: MsCoreModule
  ) {
    if (parentModule) {
      const msg = `MsCoreModule has already been loaded. Import Core modules in the AppModule only.`;
      throw new Error(msg);
    }
  }
}
