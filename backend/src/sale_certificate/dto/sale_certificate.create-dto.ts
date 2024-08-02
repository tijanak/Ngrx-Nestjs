import { Auction } from 'backend/src/auction/auction.entity';
import { Bid } from 'backend/src/bid/bid.entity';

export class CreateSaleCertificateDto {
  winningBid: Bid;
  auction: Auction;
}
