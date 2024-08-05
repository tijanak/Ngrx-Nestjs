import { IUser } from '@org/models';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  validateOrReject,
} from 'class-validator';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Auction } from '../auction/auction.entity';
import { Bid } from '../bid/bid.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  name: string;
  @Column()
  @IsString()
  surname: string;
  @Column({ select: false })
  @IsString()
  password: string;
  @Column({ unique: true })
  @IsEmail(undefined, { message: 'Email je neispravan' })
  email: string;
  @Column()
  @IsPhoneNumber(undefined, { message: 'Broj je loseg formata' })
  phone_number: string;

  @OneToMany(() => Auction, (auction) => auction.owner, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  auctions: Auction[];

  @OneToMany(() => Bid, (bid) => bid.bidder, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  bids: Bid[];
}
