import { OmitType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateImageDto {
  @IsString()
  fileName: string;
}
