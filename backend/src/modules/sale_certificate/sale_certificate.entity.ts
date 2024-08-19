import { ISale_Certificate } from '@org/models';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { Bid } from '../bid/bid.entity';

@Entity()
@Unique(['auction'])
export class SaleCertificate implements ISale_Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz' })
  time_granted: Date;
  @OneToOne(() => Auction, (auction) => auction.sale_certificate, {
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  auction: Auction;
  @OneToOne(() => Bid, (bid) => bid.sale_certificate, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn()
  winning_bid: Bid;
}
