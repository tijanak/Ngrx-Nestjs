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
  '[Auction] Upload Auction',
  props<{ auctionDto: CreateAuctionDto; images: FileList }>()
);

export const CreateAuctionSuccess = createAction(
  '[Auction] Created',
  props<{ auction: IAuction }>()
);
export const CreateAuctionFailure = createAction(
  '[Auction] Failure',
  props<{ error: HttpErrorResponse }>()
);

export const DeleteAuction = createAction(
  '[Auction] Delete Auction',
  props<{ id: number }>()
);
export const DeleteAuctionSuccess = createAction(
  '[Auction] Delete Auction Success',
  props<{ id: number }>()
);
export const DeleteAuctionFailure = createAction(
  '[Auction] Delete Auction Failure',
  props<{ error: HttpErrorResponse }>()
);
