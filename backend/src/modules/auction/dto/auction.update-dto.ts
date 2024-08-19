import { PartialType } from '@nestjs/swagger';
import { HasAtLeastOneFieldConstraint } from 'backend/src/validation/validators/has-at-least-one-field';
import { Validate } from 'class-validator';
import { CreateAuctionDto } from './auction.create-dto';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {
  @Validate(HasAtLeastOneFieldConstraint)
  _?: any;
}
