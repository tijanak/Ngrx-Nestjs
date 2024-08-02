import { IAuction_Image } from '@org/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';

@Entity()
export class AuctionImage implements IAuction_Image {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne(() => Auction, (auction) => auction.images)
  auction: Auction;
}
