import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { MsMenuItem } from '@mslibs/ms-layout';

@Component({
  selector: 'ms-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit {

  @Input() public isFull = false;
  @Input() public navItems: MsMenuItem[] = [];

  public isConfigActive: boolean = false;

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {}

}
