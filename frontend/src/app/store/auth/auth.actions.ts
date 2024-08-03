import { createAction, props } from '@ngrx/store';
import { CreateUserDto } from '@org/models';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
export const loginAuthorized = createAction('[Auth] Login Authorized');
export const loginSuccess = createAction('[Auth] Login Success');

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const registration = createAction(
  '[Auth] Register',
  props<CreateUserDto>()
);
export const registrationSucces = createAction('[Auth] Registration Success');
export const registrationFailure = createAction(
  '[Auth] Registration Failure',
  props<{ error: any }>()
);
export const logout = createAction('[Auth] Logout');
