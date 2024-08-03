import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  loginAuthorized,
} from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response) => loginAuthorized()),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );
  loginAuthorization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAuthorized),
      switchMap(() =>
        this.authService.getProfile().pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.authService.logout().pipe(
          map(() => loginFailure({ error: null })),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );
}
