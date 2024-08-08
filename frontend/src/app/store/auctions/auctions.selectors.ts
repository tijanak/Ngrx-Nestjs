import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { auctionAdapter } from './auctions.reducer';

export const selectAuctionFeature = createSelector(
  (state: AppState) => state.auction,
  (state) => state
);
export const selectAuctions=createSelector(
  selectAuctionFeature,
  auctionAdapter.getSelectors().selectAll
)
export const selectAuctionDto=createSelector(
  selectAuctionFeature,
  (auctionState)=>auctionState.uploadAuctionDto
)


