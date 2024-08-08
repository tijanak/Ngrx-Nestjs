import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuctionService } from '../../services/auction.service';
import {
  CreateAuction,
  CreateAuctionFailure,
  CreateAuctionSuccess,
  LoadAuctions,
  LoadAuctionsFailure,
  LoadAuctionsSuccess,
  UploadAuction,
} from './auctions.actions';
import {
  catchError,
  concatMap,
  filter,
  map,
  of,
  switchMap,
  withLatestFrom,
  zip,
} from 'rxjs';
import {
  uploadImages,
  uploadImagesFailure,
  uploadImagesSuccess,
} from '../images/images.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { selectAuctionDto } from './auctions.selectors';
import { CreateAuctionDto, IImage } from '@org/models';

@Injectable()
export class AuctionEffects {
  constructor(
    private actions$: Actions,
    private auctionsService: AuctionService,
    private store: Store<AppState>
  ) {}
  auction$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(LoadAuctions),
        switchMap(() => this.auctionsService.getAuctions())
      )
      .pipe(
        map((auctions) => LoadAuctionsSuccess(auctions)),
        catchError((error) => of(LoadAuctionsFailure(error)))
      )
  );

  startUploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadAuction),
      map(({ auctionDto, images }) => {
        console.log('uploading');
        if (images.length > 0)
          return uploadImages({ images, event: 'auction upload' });
        else
          return uploadImagesSuccess({ images: [], event: 'auction upload' });
      })
    )
  );
  uploadAuction$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(uploadImagesSuccess),
        filter(({ event }) => event == 'auction upload'),
        withLatestFrom(this.store.select(selectAuctionDto)),
        filter((v) => v[1] != null),
        switchMap((v) => {
          let auctionDto: CreateAuctionDto = { ...v[1]!, images: v[0].images };
          return this.auctionsService.createAuction(auctionDto);
        })
      )
      .pipe(
        map(() => CreateAuctionSuccess()),
        catchError((error) => {
          console.log(error);
          return of(CreateAuctionFailure({ error }));
        })
      )
  );
}
