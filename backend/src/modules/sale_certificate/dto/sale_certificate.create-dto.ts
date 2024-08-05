import { Auction } from '../../auction/auction.entity';
import { Bid } from '../../bid/bid.entity';

export class CreateSaleCertificateDto {
  winning_bid: Bid;
  auction: Auction;
}
