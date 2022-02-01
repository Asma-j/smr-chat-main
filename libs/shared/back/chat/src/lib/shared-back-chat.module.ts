import { SharedBackAuthModule } from '@mslibs/shared-back-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    SharedBackAuthModule,
    ConfigModule,
    ChatModule,
    RoomsModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SharedBackChatModule {}
