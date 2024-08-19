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
  UpdateAuction,
  UpdateAuctionSuccess,
  UpdateAuctionFailure,
} from './auctions.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
  zip,
} from 'rxjs';
import {
  loadImagesForAuction,
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
  auctionLoadSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAuctionSuccess),
      switchMap(({ auction }) => [
        loadImagesForAuction({ auctionId: auction.id }),
      ])
    )
  );
  auctionsLoadSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadAuctionsSuccess),
      switchMap(({ auctions }) =>
        from(auctions).pipe(
          mergeMap((auction) => [
            loadImagesForAuction({ auctionId: auction.id }),
          ])
        )
      )
    )
  );

  uploadAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAuction),
      switchMap(({ auctionDto, images }) => {
        return this.auctionsService.createAuction(auctionDto).pipe(
          mergeMap((auction) => [
            CreateAuctionSuccess({ auction }),
            uploadImages({ images, auctionId: auction.id }),
          ]),
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
  updateAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateAuction),
      switchMap(({ id, updateDto }) =>
        this.auctionsService.updateAuction(id, updateDto).pipe(
          map((auction) => {
            return UpdateAuctionSuccess({ auction });
          }),
          catchError((error) => of(UpdateAuctionFailure({ error })))
        )
      )
    )
  );
}
