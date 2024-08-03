import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  user: any | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => {
    console.log(state, user);
    return {
      ...state,
      user,
      error: null,
    };
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    error,
  })),
  on(logout, () => initialState)
);
