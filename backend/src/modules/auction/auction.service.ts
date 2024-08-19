import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from './auction.entity';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/auction.create-dto';
import { User } from '../user/user.entity';
import { UpdateAuctionDto } from '@org/models';
import { SaleSertificateService } from '../sale_certificate/sale_sertificate.service';
import { max, of } from 'rxjs';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { ImageService } from '../image/image.service';
import { AuctionDeletedEvent } from './auction.events';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepo: Repository<Auction>,
    private saleCertificateService: SaleSertificateService,
    private schedulerRegistry: SchedulerRegistry,

    private readonly eventEmitter: EventEmitter2
  ) {
    this.getAll(['sale_certificate']).then((auctions) => {
      of(...auctions).forEach((auction) => {
        if (auction.sale_certificate == null && auction.end_time < new Date()) {
          Logger.log(auction.id, auction.sale_certificate, auction.end_time);

          this.endAuction(auction.id);
        } else {
          if (auction.end_time >= new Date()) this.setAuctionEnd(auction);
        }
      });
    });
  }
  private setAuctionEnd(auction) {
    const job = new CronJob(auction.end_time, () => {
      try {
        this.endAuction(auction.id);
      } catch (e) {
        Logger.log(e);
      }
    });
    this.schedulerRegistry.addCronJob('end auction ' + auction.id, job);
    job.start();
  }
  async create(auctionDto: CreateAuctionDto, owner: User) {
    let auction = this.auctionRepo.create(auctionDto);
    if (auction) {
      auction.owner = owner;

      auction = await this.auctionRepo.save(auction);
      if (auction) {
        this.setAuctionEnd(auction);
        return auction;
      }
    }
    throw new BadRequestException();
  }
  getAll(relations: string[] = []) {
    return this.auctionRepo.find({ relations });
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
    await this.auctionRepo.update(id, updateDto);
    let updatedAuction = await this.auctionRepo.findOne({ where: { id } });
    if (updatedAuction.end_time != auction.end_time) {
      this.deleteAuctionEndJob(id);
      this.setAuctionEnd(updatedAuction);
    }
    return updatedAuction;
  }
  async delete(id) {
    let auction = await this.auctionRepo.findOne({
      where: [{ id: id }],
      relations: ['sale_certificate', 'images'],
    });
    if (!auction) {
      throw new BadRequestException('Aukcija ne postoji');
    }
    if (auction.sale_certificate != null)
      throw new ForbiddenException('Aukcija je prodata');

    auction = await this.auctionRepo.findOne({
      where: [{ id: id }],
      relations: ['images', 'bids'],
    });
    Logger.log(auction);
    try {
      await this.auctionRepo.remove(auction);

      this.eventEmitter.emit(
        'auction.deleted',
        new AuctionDeletedEvent(id, auction.images)
      );
      this.deleteAuctionEndJob(id);
      return id;
    } catch (error) {
      Logger.error('Error deleting auction:', error);
      Logger.error('Stack trace:', error.stack);
      throw new InternalServerErrorException('Greska u toku brisanja');
    }
  }
  deleteAuctionEndJob(id) {
    let job = this.schedulerRegistry.getCronJob('end auction ' + id);
    job.stop();
    this.schedulerRegistry.deleteCronJob('end auction ' + id);
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
  async endAuction(id: number) {
    const auction = await this.auctionRepo.findOne({
      where: { id },
      relations: ['bids'],
    });
    if (!auction) {
      throw new NotFoundException();
    }
    if (auction.bids.length > 0) {
      of(...auction.bids)
        .pipe(max((a, b) => b.amount - a.amount))
        .subscribe((winningBid) => {
          Logger.log(winningBid.id);
          return this.saleCertificateService.create({
            winning_bid: winningBid,
            auction,
          });
        });
    }
  }
}
