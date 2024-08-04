import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IAuction } from '@org/models';
import * as actions from './auctions.actions';
export interface AuctionState extends EntityState<IAuction> {
  selectedAuctionId: number | null;
}
export const initialState: AuctionState = {
  ids: [],
  entities: {},
  selectedAuctionId: null,
};

export const adapter: EntityAdapter<IAuction> = createEntityAdapter<IAuction>();

export const auctionReducer = createReducer(
  initialState,
  on(actions.LoadAuctionsSuccess, (state, { auctions }) => {
    return adapter.addMany(auctions, state);
  })
);
