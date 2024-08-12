import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import {
  UpdateUser,
  UpdateUserSuccess,
  UpdateUserFailure,
} from './user.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateUser),
      switchMap((action) =>
        this.userService.updateProfile(action.updateDto).pipe(
          map((user) => UpdateUserSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UpdateUserFailure({ error }))
          )
        )
      )
    )
  );
}
