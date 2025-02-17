import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { inject, Injector } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const injector = inject(Injector);
  const authService = injector.get(AuthService);
  return authService.checkSession().pipe(
    map((response) => {
      if (response.data?.authenticate) {
        return true;
      } else {
        return router.createUrlTree(['auth/login']);
      }
    }),
  );
};
