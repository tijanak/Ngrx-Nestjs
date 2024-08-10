import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UpdateUserDto } from '@org/models';

export const UpdateUser = createAction(
  '[User] Update User',
  props<{ updateDto: UpdateUserDto }>()
);

export const UpdateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ updateDto: UpdateUserDto }>()
);

export const UpdateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: HttpErrorResponse }>()
);
