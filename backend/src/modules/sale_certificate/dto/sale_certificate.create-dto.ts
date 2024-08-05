import { Auction } from '../../auction/auction.entity';
import { Bid } from '../../bid/bid.entity';

export class CreateSaleCertificateDto {
  winningBid: Bid;
  auction: Auction;
}
