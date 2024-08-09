import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CreateAuctionDto, IAuction } from '@org/models';
import * as actions from './auctions.actions';
import { HttpErrorResponse } from '@angular/common/http';
export interface AuctionState extends EntityState<IAuction> {
  selectedAuctionId: number | null;
  uploadAuctionDto: CreateAuctionDto | null;
  error: HttpErrorResponse | null;
}
export const initialState: AuctionState = {
  ids: [],
  entities: {},
  selectedAuctionId: null,
  uploadAuctionDto: null,
  error: null,
};

export const auctionAdapter: EntityAdapter<IAuction> =
  createEntityAdapter<IAuction>();

export const auctionReducer = createReducer(
  initialState,
  on(actions.LoadAuctionsSuccess, (state, { auctions }) => {
    return auctionAdapter.setAll(auctions, state);
  }),
  on(actions.CreateAuction, (state, { auctionDto }) => {
    console.log('reducing auctiondto');
    return {
      ...state,
      uploadAuctionDto: auctionDto,
      error: null,
    };
  }),
  on(actions.CreateAuctionFailure, (state, { error }) => {
    return { ...state, error, uploadAuctionDto: null };
  }),
  on(actions.CreateAuctionSuccess, (state, { auction }) => {
    let newState = { ...state, uploadAuctionDto: null };
    return auctionAdapter.addOne(auction, state);
  }),
  on(actions.LoadAuctionsFailure, (state, { error }) => {
    return { ...state, error };
  })
);
