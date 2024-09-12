import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { auctionAdapter } from './auctions.reducer';
import { selectRouteParams } from '../routing/routing.selectors';

const { selectEntities, selectAll } = auctionAdapter.getSelectors();
export const selectAuctionFeature = createSelector(
  (state: AppState) => state.auction,
  (state) => state
);
export const selectAuctionEntities = createSelector(
  selectAuctionFeature,
  selectEntities
);
export const selectSelectedAuction = createSelector(
  selectAuctionEntities,
  selectRouteParams,
  (auctions, { id }) => auctions[id]
);

export const selectAuctions = createSelector(selectAuctionFeature, selectAll);

export const selectAuctionError = createSelector(
  selectAuctionFeature,
  (auctionState) => auctionState.error
);
