import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideToastr } from "ngx-toastr";
import { jwtInterceptor } from "./core/interceptor/jwt.interceptor";
import { provideAuth0 } from '@auth0/auth0-angular' 


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideToastr(),
    provideAuth0({
      domain: 'dev-mxd0iyxdhh7uq4me.us.auth0.com', 
      clientId: 'uu52MLVHuccsBhEygc7WKbtSg864QCfn',
      authorizationParams: {
        redirect_uri: ''
      }
    })
  ],
};
