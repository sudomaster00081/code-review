import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStore, provideState } from '@ngrx/store';
import { ClaimEffects } from './claims/store/effects/claim.effects';
import { claimReducer } from './claims/store/reducers/claim.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(
        {
            route: routerReducer,
        }
    ),
    provideHttpClient(),
    provideEffects(ClaimEffects),
    provideState({
        name: 'claims',
        reducer: claimReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false, }),
    provideRouterStore()
  ]
};
