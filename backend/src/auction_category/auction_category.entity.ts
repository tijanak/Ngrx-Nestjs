import { IAuction_Category } from '@org/models';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';

@Entity()
export class AuctionCategory implements IAuction_Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  category_name: string;
  @ManyToMany(() => Auction, (auction) => auction.categories)
  auctions: Auction[];
}
