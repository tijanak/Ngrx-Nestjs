import { PartialType } from '@nestjs/swagger';
import { CreateAuctionCategoryDto } from './auction_category.create-dto';

export class UpdateAuctionDto extends PartialType(CreateAuctionCategoryDto) {}
