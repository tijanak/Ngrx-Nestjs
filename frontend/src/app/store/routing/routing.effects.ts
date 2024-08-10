import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { map, filter, mergeMap, tap } from 'rxjs/operators';
import { LoadAuction, LoadAuctions } from '../auctions/auctions.actions';
import { LoadBidsForAuction } from '../bids/bids.actions';
import { loadSaleCertificates } from '../sale-certificate/sale-certificate.actions';

@Injectable()
export class RouteEffects {
  constructor(private actions$: Actions) {}

  navigationToAuction$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      filter((action) =>
        /^\/auction\/\d+$/.test(action.payload.routerState.url)
      ),

      mergeMap((action) => {
        const routeParams = action.payload.routerState.root.firstChild!.params;
        console.log(routeParams);
        const id = routeParams['id'];

        return [LoadAuction({ id }), LoadBidsForAuction({ auctionId: id })];
      })
    )
  );
  navigationToHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      filter((action) => action.payload.routerState.url === '/home'),

      mergeMap(() => {
        return [LoadAuctions()];
      })
    )
  );
  navigationToProfil$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      filter((action) => action.payload.routerState.url === '/profile'),

      mergeMap(() => {
        return [loadSaleCertificates()];
      })
    )
  );
}
