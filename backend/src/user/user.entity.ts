import { IUser } from '@org/models';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { Bid } from '../bid/bid.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  surname: string;
  @Column({ select: false })
  password: string;
  @Column()
  @IsEmail()
  email: string;
  @Column()
  @IsPhoneNumber()
  phone_number: string;

  @OneToMany(() => Auction, (auction) => auction.owner)
  auctions: Auction[];

  @OneToMany(() => Bid, (bid) => bid.bidder)
  bids: Bid[];
}
