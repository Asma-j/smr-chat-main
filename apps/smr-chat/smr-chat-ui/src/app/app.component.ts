import { Component } from '@angular/core';
import { MsIconsService } from '@mslibs/ms-mat-theme';

@Component({
  selector: 'mslibs-root',
  templateUrl: './app.component.html'
}
)
export class AppComponent {
  //intanciate msIconsService to load svg assets injected in mat-cons
  constructor(private msIconsService: MsIconsService){}
}
