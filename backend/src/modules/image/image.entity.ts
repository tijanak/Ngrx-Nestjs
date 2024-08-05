import { IImage as IImage } from '@org/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { IsNumber, IsString } from 'class-validator';
@Entity()
export class Image implements IImage {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;
  @Column()
  @IsString()
  fileName: string;
  @ManyToOne(() => Auction, (auction) => auction.images)
  auction: Auction;
}
