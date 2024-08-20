import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeSr from '@angular/common/locales/sr';
import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { NavigationActionTiming, provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';
import { appEffects } from './store/app.effects';
import { appReducers } from './store/app.reducer';
registerLocaleData(localeSr);
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
    provideRouterStore({
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    { provide: LOCALE_ID, useValue: 'sr-RS' },
  ],
};
