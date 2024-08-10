import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ISale_Certificate } from '@org/models';
import * as actions from './sale-certificate.actions';

export interface SaleCertificateState extends EntityState<ISale_Certificate> {
  error: HttpErrorResponse | null;
}
export const initialState: SaleCertificateState = {
  ids: [],
  entities: {},
  error: null,
};

export const certsAdapter: EntityAdapter<ISale_Certificate> =
  createEntityAdapter<ISale_Certificate>();

export const certsReducer = createReducer(
  initialState,
  on(actions.loadSaleCertificatesSuccess, (state, { certificates }) => {
    return certsAdapter.setAll(certificates, state);
  }),
  on(actions.loadSaleCertificatesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
