import { PartialType } from '@nestjs/swagger';
import { CreateAuctionImageDto } from './auction_image.create-dto';

export class UpdateAuctionDto extends PartialType(CreateAuctionImageDto) {}
