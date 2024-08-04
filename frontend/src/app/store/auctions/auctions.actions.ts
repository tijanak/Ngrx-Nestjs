import { createAction, props } from '@ngrx/store';
import { IAuction } from '@org/models';

export const LoadAuctions = createAction('[Auction] Load Auctions');

export const LoadAuctionsSuccess = createAction(
  '[Auction] Loaded Auctions',
  props<{ auctions: IAuction[] }>()
);
