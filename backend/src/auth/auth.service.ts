import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      let correct_password = await bcrypt.compare(pass, user.password);
      Logger.log(pass);
      if (correct_password) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }
  async setCookie(res: any, token: string) {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
  }
  async clearCookie(res: any) {
    res.clearCookie('accessToken');
  }
  async register(user) {
    return this.usersService.register(user);
  }
}
