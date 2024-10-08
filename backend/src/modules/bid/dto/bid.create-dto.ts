import { IsNumber, Min } from 'class-validator';
export class CreateBidDto {
  @Min(1, { message: 'Iznos ponude mora biti veći od 0' })
  @IsNumber()
  amount: number;
}
