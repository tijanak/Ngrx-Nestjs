import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
  loadSaleCertificates,
  loadSaleCertificatesSuccess,
  loadSaleCertificatesFailure,
} from './sale-certificate.actions';
import { SaleCertificateService } from '../../services/sale-certificate.service';

@Injectable()
export class SaleCertificateEffects {
  constructor(
    private actions$: Actions,
    private saleCertificateService: SaleCertificateService
  ) {}

  loadSaleCertificates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSaleCertificates),
      mergeMap(() =>
        this.saleCertificateService.getUserCertificates().pipe(
          map((certificates) => loadSaleCertificatesSuccess({ certificates })),
          catchError((error) => of(loadSaleCertificatesFailure({ error })))
        )
      )
    )
  );
}
