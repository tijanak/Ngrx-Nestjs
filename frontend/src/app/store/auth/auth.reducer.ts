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

export interface AuthState {
  user: any | null;
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
  on(loginSuccess, (state, {}) => {
    return {
      ...state,
      loggedIn: true,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loggedIn: false,
    error: error,
  })),
  on(logout, () => initialState),
  on(registrationSucces, (state, {}) => ({
    ...state,
    loggedIn: true,
    error: null,
  })),
  on(registrationFailure, (state, { error }) => ({
    ...state,
    loggedIn: false,
    error: error,
  }))
);
