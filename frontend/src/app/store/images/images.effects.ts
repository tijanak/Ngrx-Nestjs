import { Injectable } from "@nestjs/common";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ImageService } from "../../services/image.service";
import { uploadImages, uploadImagesFailure, uploadImagesSuccess } from "./images.actions";
import { catchError, filter, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class ImageEffects {
  constructor(private actions$: Actions, private imageService: ImageService) {}

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadImages),
      switchMap(({ images,event}) =>
        this.imageService.postImages(images).pipe(
          map(images => uploadImagesSuccess({images,event})),
          catchError(error => of(uploadImagesFailure({ error ,event})))
        )
      )
    )
  );
}