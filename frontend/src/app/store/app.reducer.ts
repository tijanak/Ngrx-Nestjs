import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { auctionReducer, AuctionState } from './auctions/auctions.reducer';
import {
  routerReducer,
  RouterReducerState,
  SerializedRouterStateSnapshot,
} from '@ngrx/router-store';
import { bidReducer, BidState } from './bids/bids.reducer';
export interface AppState {
  auth: AuthState;
  auction: AuctionState;
  router: RouterReducerState<SerializedRouterStateSnapshot>;
  bid: BidState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  auction: auctionReducer,
  router: routerReducer,
  bid: bidReducer,
};
