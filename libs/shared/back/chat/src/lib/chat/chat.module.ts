import { Module } from '@nestjs/common';
import { SharedBackAuthModule } from '@mslibs/shared-back-auth';
// Modules
import { RoomsModule } from '../rooms/rooms.module';
// Components
import { ChatGateway } from './chat.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SharedBackAuthModule, RoomsModule, ConfigModule],
  providers: [ChatGateway],
})
export class ChatModule { }
