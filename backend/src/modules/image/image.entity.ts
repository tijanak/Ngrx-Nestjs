import { IImage } from '@org/models';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';
@Entity()
export class Image implements IImage {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;
  @Column()
  @IsString()
  fileName: string;
  @ManyToOne(() => Auction, (auction) => auction.images, {
    onDelete: 'CASCADE',
  })
  auction: Auction;
}
