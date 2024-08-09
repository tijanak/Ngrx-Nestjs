import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImageService } from '../../services/image.service';
import {
  uploadImages,
  uploadImagesFailure,
  uploadImagesSuccess,
} from './images.actions';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions, private imageService: ImageService) {}

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadImages),
      switchMap(({ images, event }) => {
        console.log('image effect uploading');
        return this.imageService.postImages(images).pipe(
          map((images) => {
            console.log('success', images);
            return uploadImagesSuccess({ images, event });
          }),
          catchError((error) => {
            console.log('error', error);
            return of(uploadImagesFailure({ error, event }));
          })
        );
      })
    )
  );
}
