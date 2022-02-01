import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';
import { MsMenuItem } from '@mslibs/ms-layout';

@Component({
  selector: 'mslibs-nav-menu-item',
  templateUrl: './nav-menu-item.component.html',
  styleUrls: ['./nav-menu-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavMenuItemComponent implements OnInit {

  public expanded: boolean = false;
  public isActiveItem: boolean;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() navItem: MsMenuItem;
  @Input() depth: number;

  @Output() onMenuSelected : EventEmitter<any> = new EventEmitter<any>();

  constructor(public layoutService: LayoutService,
    private activateRoute: ActivatedRoute,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.layoutService._selectedMenuItem.subscribe((selectecMitem: MsMenuItem) => {
      if (this.navItem && this.navItem.link && selectecMitem) {
        //check by link
        this.isActiveItem = this.navItem.link === selectecMitem.link;
      }
    });
  }

  clickParentText(item: MsMenuItem) {
    //to check || item.link
    if (item.children && item.children.length || item.link) {
      this.openItem(item);
    }
  }

  onItemSelected(item: MsMenuItem) {
    // no children : open url menu
    if (!item.children || !item.children.length) {
      this.openItem(item);
    }
    // has children : only expand (to open check clickParentText)
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
      this.ariaExpanded = this.expanded;
    }
  }

  openItem(item: MsMenuItem) {
    //console.log('Menu openItem item.link',item.link);
    /* using { relativeTo: this.activateRoute } / block navigation between other module out of private route
        https://angular.io/guide/router#specifying-a-relative-route
    */
    this.router.navigate([item.link]);
    this.onMenuSelected.emit(true);
    this.layoutService.selectedMenuItem = item;
  }
}
