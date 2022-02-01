import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { AuthService } from '@mslibs/ms-auth';
import { UserDto } from '@mslibs/shared/front-back/user/dtos';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private selectedTheme: boolean = false;
  private isMenuShow: boolean = false;

  @Input() profile: UserDto;

  //quiq test for only client in prod : todo guard and back-office
  isProd :boolean;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChangeTheme: EventEmitter<boolean> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggleMenu: EventEmitter<boolean> = new EventEmitter();
  @Output() onSwitchApp: EventEmitter<boolean> = new EventEmitter();
  
  constructor(
    private authService: AuthService,
    @Inject('environment') environment
  ) { 
    this.isProd = environment.production;
  }

  ngOnInit() {}

  themeChange() {
    this.selectedTheme = !this.selectedTheme;
    this.onChangeTheme.emit(this.selectedTheme);
  }

  toggleMenu() {
    this.isMenuShow = !this.isMenuShow;
    this.onToggleMenu.emit(this.isMenuShow);
  }

  applicationSwitch(){
    this.onSwitchApp.emit(true);
  }

  logout() {
    this.authService.logout();
  }

}
