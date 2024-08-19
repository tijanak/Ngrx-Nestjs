import { Image } from '../image/image.entity';

export class AuctionDeletedEvent {
  constructor(
    public readonly auctionId: number,
    public readonly images: Image[]
  ) {}
}
