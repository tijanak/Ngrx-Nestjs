import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionModule } from '../auction/auction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '@org/environment';
import { Auction } from '../auction/auction.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';
import { Bid } from '../bid/bid.entity';
import { Image } from '../image/image.entity';
import { SaleCertificate } from '../sale_certificate/sale_certificate.entity';
import { BidModule } from '../bid/bid.module';
import { ImageModule } from '../image/image.module';
import { SaleSertificateModule } from '../sale_certificate/sale_sertificate.module';

import { ScheduleModule } from '@nestjs/schedule';
import { ImageSubscriber } from '../image/subscribers/image.subscriber';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NX_POSTGRES_HOST,
      port: +process.env.NX_POSTGRES_PORT,
      username: process.env.NX_POSTGRES_USER,
      password: process.env.NX_POSTGRES_PASSWORD,
      database: process.env.NX_POSTGRES_DB,
      entities: [User, Auction, Bid, Image, SaleCertificate],
      synchronize: true,
      subscribers: [ImageSubscriber],
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
