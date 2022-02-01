import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from '../../services/chat-sockets/socket.service';
import { RoomService } from './../../services/rooms/rooms.service';
import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import { MessageDto, RoomDto } from '@mslibs/shared/front-back/chat/dtos';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  public text: string;
  public name: string;
  public newRoom: string;
  public messages: MessageDto[] = [];
  public rooms: RoomDto[] = [];
  public title: string;
  public currentRoomId: string;
  public users: UserUpdateDto[] = [];

  private unsubscribeOnDestroy = new Subject<void>();

  public constructor(
    private chatService: ChatService,
    private roomService: RoomService,
  ) {
    this.title = 'Eat a carrot )';
    this.messages.push(new MessageDto('Bugz Bunny', 'Choose the room =)'));
  }

  public ngOnInit() {
    this.getProfile();
    this.chatService
      .getMessage()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((data: MessageDto) => {
        this.messages.push(data);
      });
    this.getRooms();
    this.getRoomsFromSocket();
    this.getUsersList();
  }

  public ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  public send(): void {
    if (this.text && this.text.trim() !== '') {
      this.chatService.sendMessage(this.text, this.name, this.currentRoomId);
      this.text = '';
    }
  }

  public addnewroom(): void {
    if (this.newRoom && this.newRoom.trim() !== '') {
      this.chatService.addRoom(this.newRoom);
    }
  }

  public getRoomsFromSocket(): void {
    this.chatService.getRooms()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: RoomDto) => {
        const updatedRooms = [res, ...this.rooms];
        this.rooms = updatedRooms;
      });
  }


  public getRooms(): void {
    this.roomService.getRooms()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: RoomDto[]) => {
        this.rooms = res;
      });
  }

  public joinRoom(room): void {
    this.chatService.joinRoom(room);
    this.currentRoomId = room;
  }

  public getRoom(id): void {
    this.roomService.getRoom(id)
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((res: RoomDto) => {
        this.messages = res.messages;
        this.title = res.name;
      });
  }

  public getProfile(): void {
    console.log('todo get profile:cureent connected user');
    // this.userService.getProfile()
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((res: User) => {
    //     this.name = res.username;
    //   });
  }

  public getUsersList(): void {
    this.chatService.getUsers()
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe((users: UserUpdateDto[]) => {
        console.log('getUsersList users',users);
        this.users = users;
      });
  }

}
