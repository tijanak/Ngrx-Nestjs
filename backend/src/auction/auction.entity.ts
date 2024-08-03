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
import { AuctionImage } from '../auction_image/auction_image.entity';
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
  @IsDate()
  end_time: Date;
  @IsDate()
  @Column({ type: 'timestamptz' })
  start_time: Date;

  @Column()
  @Min(1, { message: 'Minimalna cena mora biti veca od 0' })
  min_price: number;

  @ManyToMany(() => AuctionCategory, (category) => category.auctions)
  categories: AuctionCategory[];
  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;
  @OneToMany(() => AuctionImage, (image) => image.auction, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  images: AuctionImage[];

  @OneToOne(() => SaleCertificate, (certificate) => certificate.auction, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  sale_certificate: SaleCertificate | null;

  @OneToMany(() => Bid, (bid) => bid.auction, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bids: Bid[];
}
