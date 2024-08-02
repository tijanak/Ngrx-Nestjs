import { OmitType } from '@nestjs/swagger';
import { AuctionCategory } from '../auction_category.entity';
export class CreateAuctionCategoryDto extends OmitType(AuctionCategory, [
  'auctions',
  'id',
] as const) {}
