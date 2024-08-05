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
import { AuctionCategory } from '../auction_category/auction_category.entity';
import { Image } from '../auction_image/image.entity';
import { SaleCertificate } from '../sale_certificate/sale_certificate.entity';
import { BidModule } from '../bid/bid.module';
import { AuctionImageModule } from '../auction_image/image.module';
import { SaleSertificateModule } from '../sale_certificate/sale_sertificate.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      database: 'e-auction',
      entities: [User, Auction, Bid, AuctionCategory, Image, SaleCertificate],
      synchronize: true,
    }),
    AuctionModule,
    UserModule,
    BidModule,
    AuthModule,
    AuctionImageModule,
    SaleSertificateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
