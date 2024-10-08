import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleCertificateDto } from './dto/sale_certificate.create-dto';
import { SaleCertificate } from './sale_certificate.entity';

@Injectable()
export class SaleSertificateService {
  constructor(
    @InjectRepository(SaleCertificate)
    private certificateRepo: Repository<SaleCertificate>
  ) {}
  create(createSaleSertificateDto: CreateSaleCertificateDto) {
    const certificate = this.certificateRepo.create(createSaleSertificateDto);

    return this.certificateRepo.save(certificate);
  }

  getUserCertificates(id: number) {
    return this.certificateRepo
      .createQueryBuilder('sale_certificate')
      .leftJoinAndSelect('sale_certificate.auction', 'auction')
      .leftJoinAndSelect('auction.owner', 'auction_owner')
      .leftJoinAndSelect('auction.images', 'images')
      .leftJoinAndSelect('sale_certificate.winning_bid', 'winning_bid')
      .leftJoinAndSelect('winning_bid.bidder', 'bidder')
      .where('auction_owner.id = :userId OR bidder.id = :userId', {
        userId: id,
      })
      .getMany();
  }
}
