import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const publicGuard: CanActivateFn = (route, state) => {
  const _cookieService = inject(CookieService);
  const _router = inject(Router);

  if (_cookieService.check('verification')) {
    return true;
  } else {
    return _router.createUrlTree(['**']);
  }

};
