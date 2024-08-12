import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.create-dto';
import { IsOptional, Validate } from 'class-validator';
import { HasAtLeastOneFieldConstraint } from 'backend/src/validation/validators/has-at-least-one-field';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const)
) {
  @Validate(HasAtLeastOneFieldConstraint)
  _?: any;
}
