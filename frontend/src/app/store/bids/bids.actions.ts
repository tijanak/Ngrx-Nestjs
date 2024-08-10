import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CreateBidDto, IBid, UpdateBidDto } from '@org/models';

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
export const DeleteBid = createAction(
  '[Bid] Delete Bid',
  props<{ id: number }>()
);

export const DeleteBidSuccess = createAction(
  '[Bid] Delete Bid Success',
  props<{ id: number }>()
);

export const DeleteBidFailure = createAction(
  '[Bid] Delete Bid Failure',
  props<{ error: HttpErrorResponse }>()
);
export const UpdateBid = createAction(
  '[Bid] Update Bid',
  props<{ id: number; updateBidDto: UpdateBidDto }>()
);

export const UpdateBidSuccess = createAction(
  '[Bid] Update Bid Success',
  props<{ updatedBid: IBid }>()
);

export const UpdateBidFailure = createAction(
  '[Bid] Update Bid Failure',
  props<{ error: HttpErrorResponse }>()
);
