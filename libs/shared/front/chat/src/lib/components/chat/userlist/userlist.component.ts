import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserlistComponent implements OnInit {

  @Input() users: UserUpdateDto[];

  constructor() { }

  ngOnInit() {
  }

}
