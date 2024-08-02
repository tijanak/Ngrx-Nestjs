import { OmitType } from '@nestjs/swagger';
import { Bid } from '../bid.entity';
export class CreateBidDto extends OmitType(Bid, [
  'bidder',
  'auction',
  'time_created',
  'id',
  'sale_certificate',
] as const) {}
