import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { AuctionService } from '../../services/auction.service';
import { loadImagesForAuction, uploadImages } from '../images/images.actions';
import {
  CreateAuction,
  CreateAuctionFailure,
  CreateAuctionSuccess,
  DeleteAuction,
  DeleteAuctionFailure,
  DeleteAuctionSuccess,
  LoadAuction,
  LoadAuctionFailure,
  LoadAuctions,
  LoadAuctionsFailure,
  LoadAuctionsSuccess,
  LoadAuctionSuccess,
  UpdateAuction,
  UpdateAuctionFailure,
  UpdateAuctionSuccess,
} from './auctions.actions';

@Injectable()
export class AuctionEffects {
  constructor(
    private actions$: Actions,
    private auctionsService: AuctionService
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
