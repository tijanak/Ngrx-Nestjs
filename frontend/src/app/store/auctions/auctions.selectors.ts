import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';

export const selectAuctionFeature = createSelector(
  (state: AppState) => state.auction,
  (state) => state
);
