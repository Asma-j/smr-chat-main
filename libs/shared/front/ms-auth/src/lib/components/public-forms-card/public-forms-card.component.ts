import { Component, OnInit, Input } from '@angular/core';
import { MsAppService } from '../../services/app-config.service';

@Component({
  selector: 'mslibs-public-forms-card',
  templateUrl: './public-forms-card.component.html',
  styleUrls: ['./public-forms-card.component.scss']
})
export class PublicFormsCardComponent implements OnInit {

  appLogo = 'settings_input_svideo';
  appPhotoUrl = null;
  appTitle ='Free-Life';
  @Input() pageTitle ='';

  constructor(msAppService :MsAppService) { 
    this.appLogo = msAppService.appIcon;
    this.appTitle=  msAppService.appName;
    this.appPhotoUrl = msAppService.appPhotoUrl;
  }

  ngOnInit() {}

}
