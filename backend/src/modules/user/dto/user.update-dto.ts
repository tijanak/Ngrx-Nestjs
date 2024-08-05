import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.create-dto';
import { Validate } from 'class-validator';
import { HasAtLeastOneFieldConstraint } from 'backend/src/validation/validators/has-at-least-one-field';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Validate(HasAtLeastOneFieldConstraint)
  _: any;
}
