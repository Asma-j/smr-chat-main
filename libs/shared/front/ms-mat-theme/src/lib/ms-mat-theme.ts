

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, MaterialModule } from '@mslibs/front-share';
import { HttpClientModule } from '@angular/common/http';
import { MsIconsService } from './icons/ms-icons.service';

@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers : [MsIconsService]
})
export class MsThemeModule { }
