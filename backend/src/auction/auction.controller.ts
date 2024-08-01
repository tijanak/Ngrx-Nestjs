import { Body, Controller, Post } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/auction.create-dto';

@Controller('auction')
export class AuctionController {
  constructor(private service: AuctionService) {}
  @Post()
  create(@Body() auctionDto: CreateAuctionDto) {
    this.service.create(auctionDto);
  }
}
