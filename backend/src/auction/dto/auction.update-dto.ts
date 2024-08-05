import { PartialType } from '@nestjs/swagger';
import { CreateAuctionDto } from './auction.create-dto';
import { Validate } from 'class-validator';
import { HasAtLeastOneFieldConstraint } from 'backend/src/validation/validators/has-at-least-one-field';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {
  @Validate(HasAtLeastOneFieldConstraint)
  _: any;
}
