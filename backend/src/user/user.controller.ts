import {
  Body,
  ConflictException,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@org/models';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
