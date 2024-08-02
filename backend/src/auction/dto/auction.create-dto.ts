import { OmitType } from '@nestjs/swagger';
import { Auction } from '../auction.entity';
export class CreateAuctionDto extends OmitType(Auction, [
  'sale_certificate',
  'id',
  'owner',
] as const) {}
