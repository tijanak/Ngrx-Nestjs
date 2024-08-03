import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  loginAuthorized,
  registration,
  registrationSucces,
  registrationFailure,
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
          map((response) => {
            return loginSuccess();
          }),
          catchError((error) => {
            return of(loginFailure({ error }));
          })
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
  registration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registration),
      switchMap((userData) =>
        this.authService.register(userData).pipe(
          map((r) => {
            console.log(r, 'succes');
            return registrationSucces();
          }),
          catchError((error) => of(registrationFailure({ error })))
        )
      )
    )
  );
}
