import { OmitType } from '@nestjs/swagger';
import { Auction } from '../auction.entity';
import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { IsDateGreaterThan } from 'backend/src/validation/validators/is-date-greater-than.validator';
import { IsNotInPast } from 'backend/src/validation/validators/is-not-in-past.validator';
export class CreateAuctionDto {
  @IsString()
  title: string;
  @MaxLength(1500, { message: 'Opis ne može biti duži od 1500 karaktera' })
  @IsString()
  description: string;
  @IsDate({ message: 'Neispravan format krajnjeg vremena' })
  end_time: Date;
  @Validate(IsDateGreaterThan, ['end_time'])
  @Validate(IsNotInPast)
  @IsDate({ message: 'Neispravan format početnog vremena' })
  start_time: Date;

  @Min(1, { message: 'Minimalna cena mora biti veca od 0' })
  @IsNumber()
  min_price: number;
}
