import { IImage as IImage } from '@org/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';

@Entity()
export class Image implements IImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne(() => Auction, (auction) => auction.images)
  auction: Auction;
}
