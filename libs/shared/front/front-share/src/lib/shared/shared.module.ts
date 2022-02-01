
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleChartsModule } from 'angular-google-charts';
import { toBoolean } from '../pipes/toBoolean.pipe';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    ChartsModule,
    FlexLayoutModule],
  exports: [
    ReactiveFormsModule, 
    FlexLayoutModule, 
    GoogleChartsModule,
    ChartsModule,
    //pipes
    toBoolean
  ],
  providers:[toBoolean],
  declarations: [toBoolean]
})
export class SharedModule {}

