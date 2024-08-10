import { AuctionEffects } from './auctions/auctions.effects';
import { AuthEffects } from './auth/auth.effects';
import { BidEffects } from './bids/bids.effects';
import { ImageEffects } from './images/images.effects';
import { RouteEffects } from './routing/routing.effects';
import { SaleCertificateEffects } from './sale-certificate/sale-certificate.effects';

export const appEffects = [
  BidEffects,
  RouteEffects,
  AuthEffects,
  ImageEffects,
  AuctionEffects,
  SaleCertificateEffects,
];
