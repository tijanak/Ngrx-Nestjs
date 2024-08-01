import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuctionModule } from '../auction/auction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '@org/environment';
import { Auction } from '../auction/auction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: environment.DB_USERNAME,
      password: environment.DB_PASSWORD,
      database: 'auctions',
      entities: [Auction],
      synchronize: true,
    }),
    AuctionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
