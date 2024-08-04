import { OmitType } from '@nestjs/swagger';
import { User } from '../user.entity';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8, // Minimum length of the password
      minUppercase: 1, // Minimum number of uppercase letters
      minLowercase: 1, // Minimum number of lowercase letters
      minNumbers: 1, // Minimum number of digits
      minSymbols: 1, // Minimum number of special characters
    },
    {
      message:
        'Lozinka mora imati barem 8 karaktera, jedno veliko slovo, jedno malo slovo, jedan broj i jedan specijalan znak.',
    }
  )
  password: string;
  @IsEmail(undefined, { message: 'Email je neispravan' })
  email: string;
  @IsPhoneNumber(undefined, { message: 'Broj je loseg formata' })
  phone_number: string;
}
