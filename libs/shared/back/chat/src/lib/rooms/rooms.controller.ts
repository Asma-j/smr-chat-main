import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { RoomsService } from './rooms.service';
import { Room } from '@mslibs/shared/front-back/chat/models';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('rooms')
  async getAllRooms(): Promise<Room[]> {
    try {
      const allRooms: Room[] = await this.roomsService.findAllRooms();
      return allRooms.map(elem => {
        const newElem = { ...elem };
        delete newElem.messages;
        return newElem;
      }).sort((a, b) => {
        return (b.created_at ? new Date(b.created_at).getTime() : 0) - (a.created_at ? new Date(a.created_at).getTime() : 0);
      });
    } catch (err) {
      throw new HttpException('Rooms not found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('room/:id')
  async findRoom(@Param() params): Promise<Room> {
    try {
      return await this.roomsService.findOneRooms(params.id);
    } catch (err) {
      throw new HttpException('Room not found', HttpStatus.BAD_REQUEST);
    }
  }

}
