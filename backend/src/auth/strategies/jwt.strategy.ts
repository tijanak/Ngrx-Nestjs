import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UserService } from 'backend/src/user/user.service';
import { IUser, toIUser } from '@org/models';
import { Request } from 'express';
const ExtractJwtFromCookie = (cookieName: string) => {
  return (req: Request) => {
    const token = req.cookies[cookieName];
    return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  };
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwtFromCookie('accessToken'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any): Promise<IUser | null> {
    const authUser = await this.userService.findOne(payload.username);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    return toIUser(authUser);
  }
}
