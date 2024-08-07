import {
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Req,
  Body,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Response } from 'express';
import { CreateUserDto, toIUser } from '@org/models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    await this.authService.setCookie(res, token);
    res.send(toIUser(req.user));
  }
  @Post('logout')
  async logout(@Res() res: Response) {
    await this.authService.clearCookie(res);
    res.send({ message: 'Logged out' });
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return toIUser(req.user);
  }
  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.authService.register(userDto);
      const token = await this.authService.login(user);
      await this.authService.setCookie(res, token);
      res.send(toIUser(user));
    } catch (error) {
      Logger.log(error.code);
      res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message:
          error.code == 23505
            ? 'Email je zauzet'
            : error.message || 'Desila se greska prilikom registracije',
      });
    }
  }
}
