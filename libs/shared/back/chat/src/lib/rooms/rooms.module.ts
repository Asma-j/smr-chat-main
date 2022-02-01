import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from '@mslibs/shared/front-back/chat/models';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {
  // public configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes(RoomsController);
  // }
}
