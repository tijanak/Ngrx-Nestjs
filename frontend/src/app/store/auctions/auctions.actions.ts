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
export const UploadAuction = createAction(
  '[Auction] Upload Auction',
  props<{ auctionDto: CreateAuctionDto; images: FileList }>()
);

export const CreateAuctionSuccess = createAction('[Auction] Created');
export const CreateAuctionFailure = createAction(
  '[Auction] Failure',
  props<{ error: HttpErrorResponse }>()
);
