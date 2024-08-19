import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BidService } from '../bid.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly bidService: BidService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const bidId = +request.params.id;
    if (!Number.isInteger(bidId)) {
      throw new BadRequestException();
    }
    const bid = await this.bidService.findOne(bidId, ['bidder']);
    if (!bid) {
      throw new ForbiddenException('Bid not found');
    }

    if (bid.bidder.id !== user.id) {
      throw new ForbiddenException('Not authorized to access this bid');
    }

    return true;
  }
}
