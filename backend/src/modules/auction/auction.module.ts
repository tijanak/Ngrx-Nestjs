import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '../image/image.module';
import { SaleSertificateModule } from '../sale_certificate/sale_sertificate.module';
import { AuctionController } from './auction.controller';
import { Auction } from './auction.entity';
import { AuctionService } from './auction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Auction]), SaleSertificateModule],
  providers: [AuctionService],
  controllers: [AuctionController],
  exports: [AuctionService],
})
export class AuctionModule {}
