import { Injectable } from '@nestjs/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuctionService } from '../../services/auction.service';
import {
  LoadAuctions,
  LoadAuctionsFailure,
  LoadAuctionsSuccess,
} from './auctions.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuctionEffects {
  constructor(
    private actions$: Actions,
    private auctionsService: AuctionService
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
}
