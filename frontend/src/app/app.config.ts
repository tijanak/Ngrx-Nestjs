import {
  ApplicationConfig,
  importProvidersFrom,
  LOCALE_ID,
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
import { registerLocaleData } from '@angular/common';
import localeSr from '@angular/common/locales/sr';
import {
  NavigationActionTiming,
  provideRouterStore,
  routerReducer,
} from '@ngrx/router-store';
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
