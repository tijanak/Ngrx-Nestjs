import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CreateBidDto, IBid } from '@org/models';

export const LoadBidsForAuction = createAction(
  '[Bid] Load For Auction',
  props<{ auctionId: number }>()
);
export const LoadBidsForAuctionSuccess = createAction(
  '[Bid] Load Bids Success',
  props<{ bids: IBid[] }>()
);
export const LoadBidsForAuctionFailure = createAction(
  '[Bid] Load Bids Failure',
  props<{ error: HttpErrorResponse }>()
);

export const CreateBid = createAction(
  '[Bid] Create Bid',
  props<{ auctionId: number; createBidDto: CreateBidDto }>()
);
export const CreateBidSuccess = createAction(
  '[Bid] Create Bid Success',
  props<{ bid: IBid }>()
);
export const CreateBidFailure = createAction(
  '[Bid] Create Bid Failure',
  props<{ error: HttpErrorResponse }>()
);
