import { ISale_Certificate } from '@org/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @CreateDateColumn({ type: 'timestamptz' })
  time_granted: Date;
  @OneToOne(() => Auction, (auction) => auction.sale_certificate, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  auction: Auction;
  @OneToOne(() => Bid, (bid) => bid.sale_certificate, { nullable: false })
  @JoinColumn()
  winning_bid: Bid;
}
