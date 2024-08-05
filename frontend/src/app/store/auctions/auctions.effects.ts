import { Injectable } from '@nestjs/common';
import { Actions } from '@ngrx/effects';
import { AuctionService } from '../../services/auction.service';

@Injectable()
export class AuctionEffects {
  constructor(
    private actions$: Actions,
    private auctionsService: AuctionService
  ) {
    
  }
}
