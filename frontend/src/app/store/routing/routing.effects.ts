import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ROUTER_NAVIGATED, RouterNavigatedAction } from '@ngrx/router-store';
import { map, filter, mergeMap, tap } from 'rxjs/operators';
import { LoadAuction } from '../auctions/auctions.actions';

@Injectable()
export class RouteEffects {
  constructor(private actions$: Actions) {}

  navigateToSpecificRoute$ = createEffect(() =>
    this.actions$.pipe(
      ofType<RouterNavigatedAction>(ROUTER_NAVIGATED),
      filter((action) =>
        /^\/auction\/\d+$/.test(action.payload.routerState.url)
      ),

      map((action) => {
        const routeParams = action.payload.routerState.root.firstChild!.params;
        console.log(routeParams);
        const id = routeParams['id'];

        return LoadAuction({ id });
      })
    )
  );
}
