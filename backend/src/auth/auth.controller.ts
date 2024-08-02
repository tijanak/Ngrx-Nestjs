import { Controller, Post, UseGuards, Get, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Response } from 'express';

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
}
