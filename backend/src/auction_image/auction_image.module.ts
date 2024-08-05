import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuctionImage } from './auction_image.entity';
import { ImagesController } from './auction_image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuctionImage])],
  controllers: [ImagesController],
})
export class AuctionImageModule {}
