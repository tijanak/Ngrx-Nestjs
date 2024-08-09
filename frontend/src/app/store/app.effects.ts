import { AuctionEffects } from './auctions/auctions.effects';
import { AuthEffects } from './auth/auth.effects';
import { ImageEffects } from './images/images.effects';
import { RouteEffects } from './routing/routing.effects';

export const appEffects = [
  RouteEffects,
  AuthEffects,
  ImageEffects,
  AuctionEffects,
];
