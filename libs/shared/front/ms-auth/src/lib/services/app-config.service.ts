import { Injectable, Optional } from '@angular/core';

export class AppConfigService {
  appName = 'settings_input_svideo';
  appIcon = 'Free-Life';
  appPhotoUrl = null;
}

@Injectable({
  providedIn: 'root'
})
export class MsAppService {

  private _appName = 'Free-Life';
  get appName() {
    return this._appName
  }

  private _appPhotoUrl = null;
  get appPhotoUrl() {
    return this._appPhotoUrl;
  }

  private _appIcon = 'settings_input_svideo';
  get appIcon() {
    return this._appIcon
  }

  constructor(@Optional() config?: AppConfigService) {
    if (config) {
      this._appName = config.appName;
      this._appIcon = config.appIcon;
      this._appPhotoUrl = config.appPhotoUrl;
    }
  }

}
