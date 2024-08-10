import {
  Body,
  ConflictException,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@org/models';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Patch()
  updateProfile(@Body() updateDto: UpdateUserDto, @Req() req) {
    return this.userService.update(req.user.id, updateDto);
  }
}
