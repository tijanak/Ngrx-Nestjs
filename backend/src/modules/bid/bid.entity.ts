import { IBid } from '@org/models';
import {
  Column,
  CreateDateColumn,
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

  @CreateDateColumn({ type: 'timestamptz' })
  time_created: Date;
  @Column()
  amount: number;
  @ManyToOne(() => User, (user) => user.bids)
  bidder: User;
  @ManyToOne(() => Auction, (auction) => auction.bids, { onDelete: 'CASCADE' })
  auction: Auction;
  @OneToOne(
    () => SaleCertificate,
    (sale_certificate) => sale_certificate.winning_bid,
    { nullable: true, onDelete: 'RESTRICT' }
  )
  sale_certificate: SaleCertificate;
}
