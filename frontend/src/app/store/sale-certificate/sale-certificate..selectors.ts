import { createSelector } from '@ngrx/store';
import { certsAdapter } from './sale-certificate.reducer';
import { AppState } from '../app.reducer';

const { selectEntities, selectAll } = certsAdapter.getSelectors();

export const selectCertsFeature = createSelector(
  (state: AppState) => state.saleCerts,
  (state) => state
);

export const selectAllCerts = createSelector(selectCertsFeature, selectAll);
export const selectCertErrors = createSelector(
  selectCertsFeature,
  (state) => state.error
);
