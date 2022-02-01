import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { MongooseConfigService } from './config/mongoose/mongoose.config.service';
import { SharedBackAuthModule } from '@mslibs/shared-back-auth';
import { SharedBackChatModule } from '@mslibs/shared-back-chat';
import { ConfigModule } from '@nestjs/config';
import gConfiguration from './config/g-config';


@Module({
  imports: [
    //config
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [gConfiguration]
    }),
    //shared apps
    SharedBackAuthModule,
    SharedBackChatModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [MongooseConfigService]
})
export class AppModule { }