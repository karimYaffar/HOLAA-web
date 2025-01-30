import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const accountPendingGuard: CanActivateFn = (route, state) => {
  
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (cookieService.get('accountPending')) {
    return true;
  } else {
    return router.createUrlTree(['/']);
  }

  
};
