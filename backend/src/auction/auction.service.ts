import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/auction.create-dto';
import { User } from '../user/user.entity';
import { UpdateAuctionDto } from '@org/models';

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
  async update(id, updateDto: UpdateAuctionDto) {
    const auction = await this.auctionRepo.findOne({ where: [{ id }] });
    if (auction.end_time < new Date())
      throw new ForbiddenException(
        'Aukcija je već završena, ne može da se menja'
      );
    if (auction.start_time < new Date())
      throw new ForbiddenException(
        'Aukcija je već počela, ne može da se menja'
      );
    return this.auctionRepo.update(id, updateDto);
  }
  async delete(id) {
    const auction = await this.auctionRepo.findOne({
      where: [{ id: id }],
      relations: ['sale_certificate'],
    });
    if (auction.sale_certificate != null)
      throw new ForbiddenException('Aukcija je prodata');
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
