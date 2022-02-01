import { Injectable } from '@angular/core';
import { MessageDto, RoomDto } from '@mslibs/shared/front-back/chat/dtos';
 import { SocketOne } from './socket-one.service';
 import { Observable } from 'rxjs';
import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public constructor(private socket: SocketOne) {
  }

  public sendMessage(text: string, name: string, roomId: string): void {
    console.log('Send message',text,name);
    this.socket.emit('message', {message: text, username: name, room: roomId});
  }

  public getMessage(): Observable<MessageDto> {
    return this.socket.fromEvent<MessageDto>('message');
  }

  public joinRoom(roomId: string): void {
    this.socket.emit('joinRoom', roomId);
  }

  public getRooms(): Observable<RoomDto> {
    return this.socket.fromEvent<RoomDto>('updatedRooms');
  }

  public addRoom(roomName: string): void {
    this.socket.emit('addroom', roomName);
  }

  public getUsers(): Observable<UserUpdateDto[]> {
    return this.socket.fromEvent<UserUpdateDto[]>('usersRoom');
  }
}
