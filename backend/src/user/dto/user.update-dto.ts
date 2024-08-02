import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.create-dto';

export class UpdateBidDto extends PartialType(CreateUserDto) {}
