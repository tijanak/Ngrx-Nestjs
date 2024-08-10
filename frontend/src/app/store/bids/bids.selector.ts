import { createSelector } from '@ngrx/store';
import { bidsAdapter } from './bids.reducer';
import { AppState } from '../app.reducer';

const { selectEntities, selectAll } = bidsAdapter.getSelectors();

export const selectBidFeature = createSelector(
  (state: AppState) => state.bid,
  (state) => state
);

export const selectAllBids = createSelector(selectBidFeature, selectAll);
export const selectBidErrors = createSelector(
  selectBidFeature,
  (state) => state.error
);
