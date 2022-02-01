import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer
} from '@nestjs/websockets';
import {  UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';
import { Room } from '@mslibs/shared/front-back/chat/models';
import { Socket, Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import * as socketioJwt from 'socketio-jwt';
import { ConfigService } from '@nestjs/config';
import { RoomsService } from '../rooms/rooms.service';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  constructor( private roomService: RoomsService,   
  private configService: ConfigService) {
  }

  @WebSocketServer()
  server: Server;

  onModuleInit(): void {
    console.log('EventsGateway onModuleInit');
    this.server.use(socketioJwt.authorize({
      secret: this.configService.get('jwtSecret'),
      handshake: true
    }));
  }

  @SubscribeMessage('message')
  async message(client: Socket, data): Promise<GatewayEventInterface<{ text: string, username: string, room: Room }>> {
    console.log('EventsGateway SubscribeMessage',data );
    const updatedRoom: Room = await this.roomService.findOneAndUpdateMessages(data);
    const event = 'message';
    const payload = { text: data.message, username: data.username, room: data.room };
    client.to(data.room).emit(event, payload);
    return { event, data: payload };
  }

  @SubscribeMessage('addroom')
  async addroom(client: Socket, data: string): Promise<void> {
    const room: string = data;
    let newRoom: Room = await this.roomService.findOneByTitle(room);
    if (newRoom) {
      client.emit('rooms', 'hello its voice from room');
    } else {
      newRoom = await this.roomService.createRoom({ name: room });
      client.emit('updatedRooms', newRoom);
    }
  }

  @SubscribeMessage('joinRoom')
  async enterRoom(client: Socket, data: string): Promise<GatewayEventInterface<UserUpdateDto[]>> {
    console.log('EventsGateway joinRoom',data );
    try {
      client.join(data);
      const clientIdList: string[] = await new Promise(resolve => {
        this.server
          .of('/')
          .in(data)
          .clients((err, clients: string[]) => resolve(clients));
      })
      const userNames: UserUpdateDto[] = clientIdList
        .map((clientId: string) => {
          // socketio-jwt has incorrect type
          return (this.server.sockets.connected[clientId] as any).decoded_token.username;
        });
      //client.emit('usersRoom', userNames);
      return { event: 'usersRoom', data: userNames };
    } catch {
      return { event: 'usersRoom', data: [] };
    }
  }
}

interface GatewayEventInterface<T> {
  event: string;
  data: T;
}
