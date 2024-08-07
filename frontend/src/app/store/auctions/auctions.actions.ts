import { createAction, props } from '@ngrx/store';
import { CreateAuctionDto, IAuction } from '@org/models';

export const LoadAuctions = createAction('[Auction] Load Auctions');

export const LoadAuctionsSuccess = createAction(
  '[Auction] Loaded Auctions',
  props<{ auctions: IAuction[] }>()
);

export const CreateAuction = createAction(
  '[Auction] Create Auction',
  props<{ auctionDto: CreateAuctionDto }>()
);
