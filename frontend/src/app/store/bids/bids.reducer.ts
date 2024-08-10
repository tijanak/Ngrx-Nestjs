import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IBid } from '@org/models';
import * as actions from './bids.actions';
export interface BidState extends EntityState<IBid> {
  error: HttpErrorResponse | null;
}
export const initialState: BidState = {
  ids: [],
  entities: {},
  error: null,
};
export const bidsAdapter: EntityAdapter<IBid> = createEntityAdapter<IBid>();

export const bidReducer = createReducer(
  initialState,
  on(actions.LoadBidsForAuctionSuccess, (state, { bids }) => {
    return bidsAdapter.setAll(bids, state);
  }),
  on(actions.LoadBidsForAuctionFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(actions.CreateBidSuccess, (state, { bid }) => {
    return bidsAdapter.setOne(bid, state);
  }),
  on(actions.CreateBidFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(actions.DeleteBidSuccess, (state, { id }) => {
    return bidsAdapter.removeOne(id, state);
  }),
  on(actions.DeleteBidFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(actions.UpdateBidSuccess, (state, { updatedBid }) => {
    return bidsAdapter.updateOne(
      { id: updatedBid.id, changes: updatedBid },
      state
    );
  }),
  on(actions.UpdateBidFailure, (state, { error }) => {
    return { ...state, error };
  })
);
