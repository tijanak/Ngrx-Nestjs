import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/auction.create-dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepo: Repository<Auction>
  ) {}
  create(auctionDto: CreateAuctionDto, owner: User): Promise<Auction> {
    let auction = this.auctionRepo.create(auctionDto);
    auction.owner = owner;
    return this.auctionRepo.save(auction);
  }
  getAll() {
    return this.auctionRepo.find();
  }
  delete(id) {
    return this.auctionRepo.delete(id);
  }
  get(id: number, relations: string[] = []) {
    return this.auctionRepo.findOne({
      where: [{ id: id }],
      relations,
    });
  }

  getForUser(id: number) {
    return this.auctionRepo
      .createQueryBuilder('auction')
      .leftJoinAndSelect('auction.owner', 'owner')
      .where('owner.id = :id', { id })
      .getMany();
  }
}
