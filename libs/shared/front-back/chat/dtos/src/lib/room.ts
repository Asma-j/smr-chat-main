import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import {  MessageDto } from './message';

export interface RoomDto {
  id?: string;
  name?: string;
  description?: string;
  is_user?: boolean;
  is_private?: boolean;
  users?: UserUpdateDto[];
  messages?: MessageDto[];
  created_at?: Date;
  updated_at?: Date;
}