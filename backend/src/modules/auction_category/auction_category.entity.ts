import { IAuction_Category } from '@org/models';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Auction } from '../auction/auction.entity';

@Entity()
export class AuctionCategory implements IAuction_Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @ManyToOne(() => Auction, (auction) => auction.categories)
  auctions: Auction[];
}
