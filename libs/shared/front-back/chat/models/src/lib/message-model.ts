
import { Schema } from 'mongoose';
//import { User } from '../user/user';

export interface Message extends Document {
  id: string;
  message: string;
  room: string;
  //tofix
  user: any;
  date: Date;
}

export const MessageSchema  = new Schema({
  message: { type: String, required: true },
  room: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date}//default: Date.now 
});

