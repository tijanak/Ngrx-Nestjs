import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionModule } from '../auction/auction.module';
import { BidController } from './bid.controller';
import { Bid } from './bid.entity';
import { BidService } from './bid.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bid]), AuctionModule],
  controllers: [BidController],
  providers: [BidService],
  exports: [BidService],
})
export class BidModule {}
