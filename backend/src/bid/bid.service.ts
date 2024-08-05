import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateBidDto } from './dto/bid.create-dto';
import { UpdateBidDto } from './dto/bid.update-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './bid.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { AuctionService } from '../auction/auction.service';

@Injectable()
export class BidService {
  constructor(
    @InjectRepository(Bid)
    private bidRepo: Repository<Bid>,
    private auctionService: AuctionService
  ) {}
  async create(createBidDto: CreateBidDto, bidder: User, auctionId: number) {
    const auction = await this.auctionService.get(auctionId, ['owner']);
    if (!auction) {
      throw new ForbiddenException('Aukcija ne postoji');
    }
    if (auction.owner.id == bidder.id) {
      throw new ForbiddenException(
        'Vlasnik aukcije ne može da učestvuje u licitaciji za tu aukciju'
      );
    }
    const bid = this.bidRepo.create(createBidDto);
    bid.bidder = bidder;
    bid.auction = auction;

    return this.bidRepo.save(bid);
  }

  findAll() {
    return this.bidRepo.find();
  }

  findOne(id: number, relations: string[] = []) {
    return this.bidRepo.findOne({ where: { id }, relations });
  }

  async update(id: number, updateBidDto: UpdateBidDto) {
    const bid = await this.findOne(id);
    if (bid.amount > updateBidDto.amount)
      throw new ForbiddenException('Iznos ponude ne može da se smanjuje');
    return this.bidRepo.update(id, updateBidDto);
  }

  async remove(id: number) {
    const bid = await this.findOne(id, ['auction']);
    if (bid.auction.end_time < new Date())
      throw new ForbiddenException('Aukcija je završena');
    return this.bidRepo.delete(id);
  }
  async findUserBids(id: number) {
    return this.bidRepo
      .createQueryBuilder('bid')
      .leftJoinAndSelect('bid.auction', 'auction')
      .leftJoinAndSelect('bid.bidder', 'bidder')
      .where('bidder.id = :id', { id })
      .getMany();
  }
}
