import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import {  Message,  MessageSchema } from './message-model';

// interface
export interface Room extends Document {
  _id: string;
  id: string;
  //
  name: string;
  description?: string;
  is_user?: boolean;
  is_private?: boolean;
  users?: UserUpdateDto[];
  messages?: Message[];
  created_at?: Date;
  updated_at?: Date;
}

export const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  is_user: { type: Boolean, default: false },
  is_private: { type: Boolean, default: false },
  //users: [UserSchema],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [MessageSchema],
  created_at: { type: Date },
  updated_at: { type: Date }
});


/**
 * On every save, add the date Room
 */
RoomSchema.pre<any>("save", function (next) {
  const room = this;
  const currentDate = new Date();
  room.updated_at = currentDate;
  return next();
});

