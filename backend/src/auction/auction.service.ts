import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/auction.create-dto';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepo: Repository<Auction>
  ) {}
  create(auctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = this.auctionRepo.create(auctionDto);
    return this.auctionRepo.save(auction);
  }
}
