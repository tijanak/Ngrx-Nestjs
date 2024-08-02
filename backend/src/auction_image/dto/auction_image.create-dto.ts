import { OmitType } from '@nestjs/swagger';
import { AuctionImage } from '../auction_image.entity';
export class CreateAuctionImageDto extends OmitType(AuctionImage, [
  'id',
] as const) {}
