import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IImage } from '@org/models';

export const uploadImages = createAction(
  '[Images] Upload',
  props<{ images: FileList; auctionId: number }>()
);
export const uploadImagesSuccess = createAction(
  '[Images] Upload Success',
  props<{ images: IImage[] }>()
);

export const uploadImagesFailure = createAction(
  '[Images] Upload Failure',
  props<{ error: HttpErrorResponse }>()
);
export const loadImagesForAuction = createAction(
  '[Image] Load Images For Auction',
  props<{ auctionId: number }>()
);

export const loadImagesForAuctionSuccess = createAction(
  '[Image] Load Images For Auction Success',
  props<{ images: IImage[] }>()
);

export const loadImagesForAuctionFailure = createAction(
  '[Image] Load Images For Auction Failure',
  props<{ error: HttpErrorResponse }>()
);
export const deleteImage = createAction(
  '[Image] Delete Image',
  props<{ id: number }>()
);

export const deleteImageSuccess = createAction(
  '[Image] Delete Image Success',
  props<{ id: number }>()
);

export const deleteImageFailure = createAction(
  '[Image] Delete Image Failure',
  props<{ error: HttpErrorResponse }>()
);
