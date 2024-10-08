import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuctionService } from '../auction.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const auctionId = +request.params.id;
    if (!Number.isInteger(auctionId)) {
      throw new BadRequestException();
    }
    const auction = await this.auctionService.get(auctionId, ['owner']);
    if (!auction) {
      throw new ForbiddenException('Aukcija ne postoji');
    }

    if (auction.owner.id !== user.id) {
      throw new ForbiddenException('Not authorized to access this auction');
    }

    return true;
  }
}
