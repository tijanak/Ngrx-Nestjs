import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { provideStore } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appEffects } from './store/app.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideStore(appReducers),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        autoPause: true,
      })
    ),

    provideEffects(appEffects),
  ],
};
