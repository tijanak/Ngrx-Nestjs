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
} from './bids.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
}
