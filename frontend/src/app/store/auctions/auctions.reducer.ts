import { HttpErrorResponse } from '@angular/common/http';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CreateAuctionDto, IAuction } from '@org/models';
import * as actions from './auctions.actions';
export interface AuctionState extends EntityState<IAuction> {
  error: HttpErrorResponse | null;
}
export const initialState: AuctionState = {
  ids: [],
  entities: {},
  error: null,
};

export const auctionAdapter: EntityAdapter<IAuction> =
  createEntityAdapter<IAuction>();

export const auctionReducer = createReducer(
  initialState,
  on(actions.LoadAuctionsSuccess, (state, { auctions }) => {
    return auctionAdapter.setAll(auctions, state);
  }),
  on(actions.CreateAuctionFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(actions.CreateAuctionSuccess, (state, { auction }) => {
    let newState = { ...state };
    return auctionAdapter.addOne(auction, newState);
  }),
  on(actions.LoadAuctionsFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(actions.DeleteAuctionSuccess, (state, { id }) => {
    return auctionAdapter.removeOne(id, state);
  }),
  on(actions.DeleteAuctionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(actions.LoadAuctionSuccess, (state, { auction }) => {
    return auctionAdapter.upsertOne(auction, state);
  }),
  on(actions.LoadAuctionFailure, (state, { error }) => {
    return { ...state, error };
  }),
  on(actions.UpdateAuctionSuccess, (state, { auction }) => {
    return auctionAdapter.updateOne(
      { id: auction.id, changes: auction },
      state
    );
  }),
  on(actions.UpdateAuctionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
