import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { ImageService } from '../../services/image.service';
import {
  deleteImage,
  deleteImageFailure,
  deleteImageSuccess,
  loadImagesForAuction,
  loadImagesForAuctionFailure,
  loadImagesForAuctionSuccess,
  uploadImages,
  uploadImagesFailure,
  uploadImagesSuccess,
} from './images.actions';

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions, private imageService: ImageService) {}

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadImages),
      switchMap(({ images, auctionId }) => {
        return this.imageService.postImagesForAuction(images, auctionId).pipe(
          map((images) => {
            return uploadImagesSuccess({ images });
          }),
          catchError((error) => {
            return of(uploadImagesFailure({ error }));
          })
        );
      })
    )
  );
  loadImagesForAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadImagesForAuction),
      mergeMap((action) =>
        this.imageService.getImageForAuction(action.auctionId).pipe(
          map((images) => loadImagesForAuctionSuccess({ images })),
          catchError((error) => of(loadImagesForAuctionFailure({ error })))
        )
      )
    )
  );
  deleteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteImage),
      switchMap(({ id }) =>
        this.imageService.deleteImage(id).pipe(
          map(() => deleteImageSuccess({ id })),
          catchError((error) => of(deleteImageFailure({ error })))
        )
      )
    )
  );
}
