import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { auctionReducer, AuctionState } from './auctions/auctions.reducer';
import {
  routerReducer,
  RouterReducerState,
  SerializedRouterStateSnapshot,
} from '@ngrx/router-store';
import { bidReducer, BidState } from './bids/bids.reducer';
import {
  certsReducer,
  SaleCertificateState,
} from './sale-certificate/sale-certificate.reducer';
import { userReducer, UserState } from './user/user.reducer';
import { imageReducer, ImageState } from './images/images.reducer';
export interface AppState {
  auth: AuthState;
  auction: AuctionState;
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  bid: BidState;
  saleCerts: SaleCertificateState;
  user: UserState;
  image: ImageState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  auction: auctionReducer,
  router: routerReducer,
  bid: bidReducer,
  saleCerts: certsReducer,
  user: userReducer,
  image: imageReducer,
};
