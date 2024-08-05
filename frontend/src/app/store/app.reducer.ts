import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducer';
import { auctionReducer, AuctionState } from './auctions/auctions.reducer';

export interface AppState {
  auth: AuthState;
  auction: AuctionState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  auction: auctionReducer,
};
