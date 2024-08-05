import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
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
      throw new ForbiddenException('Auction not found');
    }

    if (auction.owner.id !== user.id) {
      throw new ForbiddenException('Not authorized to access this auction');
    }

    return true;
  }
}
