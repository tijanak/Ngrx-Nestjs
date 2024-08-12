import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuctionService } from '../../services/auction.service';
import {
  CreateAuctionFailure,
  CreateAuctionSuccess,
  LoadAuctions,
  LoadAuctionsFailure,
  LoadAuctionsSuccess,
  CreateAuction,
  DeleteAuction,
  DeleteAuctionSuccess,
  DeleteAuctionFailure,
  LoadAuction,
  LoadAuctionSuccess,
  LoadAuctionFailure,
} from './auctions.actions';
import {
  catchError,
  concatMap,
  filter,
  map,
  of,
  switchMap,
  tap,
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
    this.actions$.pipe(
      ofType(LoadAuctions),
      switchMap(() =>
        this.auctionsService.getAuctions().pipe(
          map((auctions) => {
            return LoadAuctionsSuccess({ auctions });
          }),
          catchError((error) => of(LoadAuctionsFailure({ error })))
        )
      )
    )
  );
  auctionLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAuction),
      switchMap(({ id }) =>
        this.auctionsService.getAuction(id).pipe(
          map((auction) => {
            return LoadAuctionSuccess({ auction });
          }),
          catchError((error) => of(LoadAuctionFailure({ error })))
        )
      )
    )
  );
  auctionUpload = 'auction upload';
  startUploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAuction),
      map(({ auctionDto, images }) => {
        console.log('uploading', images);
        console.log(images.length);
        if (images.length > 0) {
          return uploadImages({ images, event: this.auctionUpload });
        }

        return uploadImagesSuccess({
          images: Array<IImage>(),
          event: this.auctionUpload,
        });
      })
    )
  );
  uploadAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadImagesSuccess),
      tap(() => console.log('uploadimagesuccess')),
      filter(({ event }) => event == this.auctionUpload),
      tap(() => console.log('filtered')),
      withLatestFrom(this.store.select(selectAuctionDto)),
      tap((v) => console.log('before filter', v)),
      filter((v) => v[1] != null),
      switchMap((v) => {
        let auctionDto: CreateAuctionDto = { ...v[1]!, images: v[0].images };
        console.log('calling service', auctionDto);
        return this.auctionsService.createAuction(auctionDto).pipe(
          map((auction) => {
            console.log('created', auction);
            return CreateAuctionSuccess({ auction });
          }),
          catchError((error) => {
            console.log(error);
            return of(CreateAuctionFailure({ error }));
          })
        );
      })
    )
  );
  deleteAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAuction),
      switchMap(({ id }) =>
        this.auctionsService.deleteAuction(id).pipe(
          map(() => {
            return DeleteAuctionSuccess({ id });
          }),
          catchError((error) => of(DeleteAuctionFailure({ error })))
        )
      )
    )
  );
}
