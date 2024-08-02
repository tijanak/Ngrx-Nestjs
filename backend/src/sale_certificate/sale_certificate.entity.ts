import { ISale_Certificate } from '@org/models';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { Bid } from '../bid/bid.entity';
import { IsDate } from 'class-validator';

@Entity()
@Unique(['auction'])
export class SaleCertificate implements ISale_Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  @IsDate()
  time_granted: Date;
  @Column()
  amount: number;
  @OneToOne(() => Auction, (auction) => auction.sale_certificate, {
    nullable: false,
  })
  auction: Auction;
  @OneToOne(() => Bid, (bid) => bid.sale_certificate, { nullable: false })
  winning_bid: Bid;
}
