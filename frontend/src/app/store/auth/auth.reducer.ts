import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  registrationSucces,
  registrationFailure,
  profileLoaded,
  logoutFinished,
} from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '@org/models';

export interface AuthState {
  user: IUser | null;
  error: HttpErrorResponse | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => {
    return {
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
    user,
    error: null,
  })),
  on(registrationFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(profileLoaded, (state, { user }) => ({
    ...state,
    user,
  })),
  on(logoutFinished, (state) => ({
    ...state, 
    error:null,
    user:null
  })),
);
