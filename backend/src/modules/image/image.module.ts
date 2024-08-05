import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Image } from './image.entity';
import { ImagesController } from './auction_image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
})
export class AuctionImageModule {}
