import { createReducer, on } from '@ngrx/store';
import { IUser } from '@org/models';
import { profileLoaded } from './user.actions';

export interface UserState {
  profile: IUser | null;
}
export const initialState: UserState = {
  profile: null,
};

export const userReducer = createReducer(
  initialState,
  on(profileLoaded, (state, { user }) => {
    return { ...state, profile: user };
  })
);
