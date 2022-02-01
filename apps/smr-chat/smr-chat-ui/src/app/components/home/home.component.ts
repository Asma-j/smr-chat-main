import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MediaMatcher } from '@angular/cdk/layout';
import {  Observable } from 'rxjs';
import { MsMenuItem } from '@mslibs/ms-layout';
import { UserStoreService } from '@mslibs/ms-user';
import { UserDto } from '@mslibs/shared/front-back/user/dtos';

@Component({
  selector: 'ms-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public newNavItems$: Observable<MsMenuItem[]>;
  public profile$: Observable<UserDto>;
  public sideMenuToggle = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private overlayContainer: OverlayContainer,
    private _element: ElementRef<HTMLElement>,
    private userStoreService: UserStoreService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // init load data
    this.userStoreService.loadCurrentUser();
    this.profile$ = this.userStoreService.getCurrentUser();
  }

  toggleTheme(isSecondTheme) {
    const prfMsThemeClass = 'ms-ms-theme';
    if (isSecondTheme) {
      this._element.nativeElement.classList.add(prfMsThemeClass);
      this.overlayContainer.getContainerElement().classList.add(prfMsThemeClass);
    } else {
      this._element.nativeElement.classList.remove(prfMsThemeClass);
      this.overlayContainer.getContainerElement().classList.remove(prfMsThemeClass);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
