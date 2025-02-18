import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAuth0 } from '@auth0/auth0-angular';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { provideHotToastConfig } from '@ngneat/hot-toast';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { serviceInterceptor } from './core/interceptor/service.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHotToastConfig(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor]),
    ),
    provideToastr(),
    provideAuth0({
      domain: 'dev-mxd0iyxdhh7uq4me.us.auth0.com',
      clientId: 'uu52MLVHuccsBhEygc7WKbtSg864QCfn',
      authorizationParams: {
        redirect_uri: '',
      },
    }),
  ],
};
