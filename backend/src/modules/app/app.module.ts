import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionModule } from '../../auction/auction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '@org/environment';
import { Auction } from '../../auction/auction.entity';
import { UserModule } from '../../user/user.module';
import { AuthModule } from '../../auth/auth.module';
import { User } from '../../user/user.entity';
import { Bid } from '../../bid/bid.entity';
import { AuctionCategory } from '../../auction_category/auction_category.entity';
import { AuctionImage } from '../../auction_image/auction_image.entity';
import { SaleCertificate } from '../../sale_certificate/sale_certificate.entity';
import { BidModule } from '../../bid/bid.module';
import { AuctionImageModule } from '../../auction_image/auction_image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      database: 'e-auction',
      entities: [
        User,
        Auction,
        Bid,
        AuctionCategory,
        AuctionImage,
        SaleCertificate,
      ],
      synchronize: true,
    }),
    AuctionModule,
    UserModule,
    BidModule,
    AuthModule,
    AuctionImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
