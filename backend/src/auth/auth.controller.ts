import {
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Req,
  Body,
  HttpStatus,
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
    res.send({ message: 'Logged in' });
  }
  @Post('logout')
  async logout(@Res() res: Response) {
    await this.authService.clearCookie(res);
    res.send({ message: 'Logged out' });
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  @Post('register')
  async register(@Body() userDto: CreateUserDto, @Res() res: Response) {
    this.authService
      .register(userDto)
      .then((user) => {
        {
          return this.authService.login(user);
        }
      })
      .then((token) => {
        return this.authService.setCookie(res, token);
      })
      .then(() => {
        res.send({ message: 'Registered' });
      })
      .catch((error) => {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message || 'An error occurred during registration',
          })
          .send();
      });
  }
}
