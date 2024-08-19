import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuctionService } from '../auction/auction.service';
import { User } from '../user/user.entity';
import { Bid } from './bid.entity';
import { CreateBidDto } from './dto/bid.create-dto';
import { UpdateBidDto } from './dto/bid.update-dto';

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
    if (auction.start_time > new Date()) {
      throw new ForbiddenException('Aukcija nije pocela');
    }
    if (auction.end_time < new Date()) {
      throw new ForbiddenException('Aukcija je zavrsena');
    }
    if (auction.owner.id == bidder.id) {
      throw new ForbiddenException(
        'Vlasnik aukcije ne može da učestvuje u licitaciji za tu aukciju'
      );
    }
    if (auction.min_price > createBidDto.amount) {
      throw new ForbiddenException(
        'Ponudjena cena je manja od minimalne prihvatljive za aukciju'
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
    let bid = await this.findOne(id, ['auction']);
    if (bid.auction.end_time < new Date())
      throw new ForbiddenException('Aukcija je zavrsena');
    if (updateBidDto.amount < 0)
      throw new ForbiddenException('Iznos ponude ne može da se smanjuje');

    bid.amount += updateBidDto.amount;
    return this.bidRepo.save(bid);
  }

  async remove(id: number) {
    const bid = await this.findOne(id, ['auction']);
    if (bid.auction.end_time < new Date())
      throw new ForbiddenException('Aukcija je završena');
    return this.bidRepo.delete(id);
  }
  async findAllBidsForAuction(auctionId: number): Promise<Bid[]> {
    return await this.bidRepo.find({
      where: {
        auction: {
          id: auctionId,
        },
      },
      relations: ['bidder'],
    });
  }
}
