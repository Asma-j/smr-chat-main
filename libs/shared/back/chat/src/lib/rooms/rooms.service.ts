import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  RoomDto} from '@mslibs/shared/front-back/chat/dtos';
import { Room } from '@mslibs/shared/front-back/chat/models';
@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<Room>
  ) {}

  async createRoom(room: RoomDto): Promise<any> {
    const createdRoom = new this.roomModel(room);
    const newRoom =  await createdRoom.save();
    return newRoom;
  }

  async findAllRooms(): Promise<Room[]> {
    return await this.roomModel.find().lean().exec();
  }

  async findOneRooms(id: string): Promise<Room> {
    return await this.roomModel.findOne({ '_id': id }).lean().exec();
  }

  async findOneAndUpdateMessages(data: any): Promise<Room> {
    return await 
    this.roomModel.findOneAndUpdate(
      { _id: data.room},
      { $push: 
        { messages: 
          { username: data.username, text: data.message } 
        } 
      });
    }

    async findOneByTitle(roomTitle: string): Promise<Room> {
      return await 
      this.roomModel.findOne({ title: roomTitle });
    }

  // async findOneByRoomname(username: string): Promise<Room> {
  //   return await this.roomModel.findOne({ 'email': username }).exec();
  // }

  // async updateRoom(id: string, user: any): Promise<Room> {
  //   return await this.roomModel.findOneAndUpdate({ '_id': id }, user).exec();
  // }

  // async deleteRoom(id: string) {
  //   return await this.roomModel.findOneAndDelete({ '_id': id }).exec();
  // }

}
