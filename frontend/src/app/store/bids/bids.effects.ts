import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { BidService } from '../../services/bid.service';
import {
  LoadBidsForAuction,
  LoadBidsForAuctionSuccess,
  LoadBidsForAuctionFailure,
  CreateBid,
  CreateBidSuccess,
  CreateBidFailure,
  DeleteBid,
  DeleteBidSuccess,
  DeleteBidFailure,
  UpdateBid,
  UpdateBidSuccess,
  UpdateBidFailure,
} from './bids.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BidEffects {
  constructor(private actions$: Actions, private bidService: BidService) {}

  loadBidsForAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadBidsForAuction),
      switchMap((action) =>
        this.bidService.getBidsForAuction(action.auctionId).pipe(
          map((bids) => LoadBidsForAuctionSuccess({ bids })),
          catchError((error) => of(LoadBidsForAuctionFailure({ error })))
        )
      )
    )
  );
  createBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateBid),
      switchMap((action) =>
        this.bidService.createBid(action.auctionId, action.createBidDto).pipe(
          map((bid) => CreateBidSuccess({ bid })),
          catchError((error) => of(CreateBidFailure({ error })))
        )
      )
    )
  );
  deleteBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteBid),
      switchMap((action) =>
        this.bidService.deleteBid(action.id).pipe(
          map(() => DeleteBidSuccess({ id: action.id })),
          catchError((error: HttpErrorResponse) =>
            of(DeleteBidFailure({ error }))
          )
        )
      )
    )
  );
  updateBid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateBid),
      switchMap((action) =>
        this.bidService.updateBid(action.id, action.updateBidDto).pipe(
          map((updatedBid) => UpdateBidSuccess({ updatedBid })),
          catchError((error: HttpErrorResponse) =>
            of(UpdateBidFailure({ error }))
          )
        )
      )
    )
  );
}
