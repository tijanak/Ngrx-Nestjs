import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  registrationSucces,
  registrationFailure,
} from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '@org/models';

export interface AuthState {
  user: IUser | null;
  error: HttpErrorResponse | null;
  loggedIn: boolean | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loggedIn: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => {
    return {
      loggedIn: true,
      user,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(logout, () => initialState),
  on(registrationSucces, (state, { user }) => ({
    loggedIn: true,
    user,
    error: null,
  })),
  on(registrationFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
