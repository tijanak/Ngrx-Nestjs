import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from '../auction/auction.entity';
import { AuctionModule } from '../auction/auction.module';
import { AuthModule } from '../auth/auth.module';
import { Bid } from '../bid/bid.entity';
import { BidModule } from '../bid/bid.module';
import { Image } from '../image/image.entity';
import { ImageModule } from '../image/image.module';
import { SaleCertificate } from '../sale_certificate/sale_certificate.entity';
import { SaleSertificateModule } from '../sale_certificate/sale_sertificate.module';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NX_POSTGRES_HOST,
      port: +process.env.NX_POSTGRES_PORT,
      username: process.env.NX_POSTGRES_USER,
      password: process.env.NX_POSTGRES_PASSWORD,
      database: process.env.NX_POSTGRES_DB,
      entities: [User, Auction, Bid, Image, SaleCertificate],
      synchronize: true,
    }),
    AuctionModule,
    UserModule,
    BidModule,
    AuthModule,
    ImageModule,
    SaleSertificateModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
