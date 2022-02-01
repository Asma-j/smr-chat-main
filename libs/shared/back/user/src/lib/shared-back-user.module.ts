import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.cotroller';
import { UserService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import { UserBaseSchema } from '@mslibs/shared/front-back/user/models';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserBaseSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class SharedBackUserModule {}
