import { IBid } from '@org/models';
import { IsDate } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { SaleCertificate } from '../sale_certificate/sale_certificate.entity';
import { User } from '../user/user.entity';

@Entity()
@Unique(['bidder', 'auction'])
export class Bid implements IBid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  @IsDate()
  time_created: Date;
  @Column()
  amount: number;
  @ManyToOne(() => User, (user) => user.bids)
  bidder: User;
  @ManyToOne(() => Auction, (auction) => auction.bids)
  auction: Auction;
  @OneToOne(
    () => SaleCertificate,
    (sale_certificate) => sale_certificate.winning_bid,
    { nullable: true, onDelete: 'SET NULL' }
  )
  sale_certificate: SaleCertificate;
}
