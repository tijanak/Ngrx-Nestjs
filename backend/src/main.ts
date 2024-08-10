import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { environment } from '@org/environment';
import cookieParser from 'cookie-parser';
import { exceptionFactory } from './validation/exception-factory';

async function bootstrap() {
  Logger.log(process.env.NX_POSTGRES_HOST);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    credentials: true,
  });
  const port = environment.PORT;
  app.useLogger(['error', 'warn', 'log', 'debug', 'verbose']);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: exceptionFactory,
    })
  );
  app.use(cookieParser());
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
