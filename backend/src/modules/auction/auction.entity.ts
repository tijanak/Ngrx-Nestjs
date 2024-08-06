import { IsDate, Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bid } from '../bid/bid.entity';
import { IAuction } from '@org/models';
import { AuctionCategory } from '../auction_category/auction_category.entity';
import { User } from '../user/user.entity';
import { Image } from '../image/image.entity';
import { SaleCertificate } from '../sale_certificate/sale_certificate.entity';
@Entity()
export class Auction implements IAuction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'timestamptz' })
  end_time: Date;
  @Column({ type: 'timestamptz' })
  start_time: Date;

  @Column()
  min_price: number;

  @ManyToMany(() => AuctionCategory, (category) => category.auctions)
  categories: AuctionCategory[];
  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;
  @OneToMany(() => Image, (image) => image.auction, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: Image[];

  @OneToOne(() => SaleCertificate, (certificate) => certificate.auction, {
    nullable: true,
    onDelete: 'RESTRICT',
  })
  sale_certificate: SaleCertificate | null;

  @OneToMany(() => Bid, (bid) => bid.auction, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bids: Bid[];
}
