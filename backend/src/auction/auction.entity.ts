import {
  IAuction,
  IAuction_Category,
  IAuction_Image,
  ISale_Certificate,
  IUser,
} from '@org/models';
import { IsDate, Min } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  categories: IAuction_Category[];
  owner: IUser;
  images: IAuction_Image[];
  sale_certificate: ISale_Certificate;
}
