import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MsMenuItem } from '@mslibs/ms-layout';
import { Router, NavigationEnd, Event } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public currentUrl = new BehaviorSubject<string>(undefined);

  /** BehaviorSubject for the selected item*/
  public _selectedMenuItem: BehaviorSubject<MsMenuItem> = new BehaviorSubject<MsMenuItem>({ name: '' });
  set selectedMenuItem(value: MsMenuItem) {
    this._selectedMenuItem.next(value);
  }

  /** BehaviorSubject for the isConfigActive*/
  public _isConfigActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  set isConfigActive(value: boolean) {
    this._isConfigActive.next(value);
  }

  /** BehaviorSubject for the _filtred Badge */
  public _filtredBadge: BehaviorSubject<number | string> = new BehaviorSubject<number | string>('');
  set filtredBadge(value: number | string) {
    this._filtredBadge.next(value);
  }

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

}
