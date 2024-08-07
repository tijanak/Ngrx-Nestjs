import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CreateAuctionDto, IAuction } from '@org/models';

export const LoadAuctions = createAction('[Auction] Load Auctions');

export const LoadAuctionsSuccess = createAction(
  '[Auction] Loaded Auctions',
  props<{ auctions: IAuction[] }>()
);
export const LoadAuctionsFailure = createAction(
  '[Auction] Loaded Auctions',
  props<{ error: HttpErrorResponse }>()
);
export const CreateAuction = createAction(
  '[Auction] Create Auction',
  props<{ auctionDto: CreateAuctionDto }>()
);
