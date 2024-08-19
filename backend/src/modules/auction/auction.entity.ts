import { IAuction } from '@org/models';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bid } from '../bid/bid.entity';
import { Image } from '../image/image.entity';
import { SaleCertificate } from '../sale_certificate/sale_certificate.entity';
import { User } from '../user/user.entity';
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

  @ManyToOne(() => User, (user) => user.auctions)
  owner: User;
  @OneToMany(() => Image, (image) => image.auction, {
    cascade: true,
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
    onUpdate: 'CASCADE',
  })
  bids: Bid[];
}
