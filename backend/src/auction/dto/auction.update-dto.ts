import { PartialType } from '@nestjs/swagger';
import { CreateAuctionDto } from './auction.create-dto';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {}
