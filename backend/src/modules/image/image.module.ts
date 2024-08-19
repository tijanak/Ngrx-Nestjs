import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './image.controller';
import { Image } from './image.entity';
import { ImageService } from './image.service';
import { AuctionModule } from '../auction/auction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), AuctionModule],
  controllers: [ImagesController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
