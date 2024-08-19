import { IImage } from '@org/models';
import { IsDateGreaterThan } from 'backend/src/validation/validators/is-date-greater-than.validator';
import { IsNotInPast } from 'backend/src/validation/validators/is-not-in-past.validator';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Image } from '../../image/image.entity';
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
  @ValidateNested({ each: true, message: 'Slika nije dobrog formata' })
  @Type(() => Image)
  images: IImage[];
}
