/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import * as passport from 'passport';
import * as swStats from 'swagger-stats';
// Load your swagger specification 
//var apiSpec = require('./swagger.json');

import { environment } from './environments/environment';
//to inject env / for clinicjs use in production
//require('dotenv').config({path: __dirname + '/.env'})
// require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  //passport sessions
  app.use(passport.initialize());
  app.use(passport.session());
  //enable cors // todo only external provider autorize (like google login)
  //app.enableCors();

  // Enable swagger-stats middleware in express app, passing swagger specification as option 
  app.use(swStats.getMiddleware({ 
    uriPath: '/api/swagger-stats'
   }));
  const apiPort = parseInt(process.env.apiPort, 10) || environment.apiPort;
  await app.listen(apiPort, () => {
    console.log('Listening at http://localhost:', apiPort);
  });
}
bootstrap();