import { createAction, props } from '@ngrx/store';
import { ISale_Certificate } from '@org/models';

export const loadSaleCertificates = createAction(
  '[Sale Certificate] Load Sale Certificates'
);

export const loadSaleCertificatesSuccess = createAction(
  '[Sale Certificate] Load Sale Certificates Success',
  props<{ certificates: ISale_Certificate[] }>()
);

export const loadSaleCertificatesFailure = createAction(
  '[Sale Certificate] Load Sale Certificates Failure',
  props<{ error: any }>()
);
