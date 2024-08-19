import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from './image.controller';
import { Image } from './image.entity';
import { ImageService } from './image.service';
import { AuctionModule } from '../auction/auction.module';
import { ImageListener } from './image.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), AuctionModule],
  controllers: [ImagesController],
  providers: [ImageService, ImageListener],
  exports: [ImageService, ImageListener],
})
export class ImageModule {}
