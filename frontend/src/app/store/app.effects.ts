import { AuctionEffects } from './auctions/auctions.effects';
import { AuthEffects } from './auth/auth.effects';
import { ImageEffects } from './images/images.effects';

export const appEffects = [AuthEffects, ImageEffects, AuctionEffects];
