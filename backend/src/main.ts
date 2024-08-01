/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from '@org/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin:["http://localhost:4200"],methods:['GET','POST','DELETE','PUT']})
  const port = environment.PORT;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
