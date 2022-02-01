

import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';

// Dto
export class MessageDto {
   _id?: string; //force in update to not generate new  _id
   id?: string;
   message: string;
   room?: string;
   user: UserUpdateDto;
   date: Date;
   public constructor(userId: string, text: string, room?: string) {
    // this.user = userId;
    this.message = text;
    this.room = room;
  }
}
