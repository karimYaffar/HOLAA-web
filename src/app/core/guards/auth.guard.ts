import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { inject, Injector } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const injector = inject(Injector);
  const router = inject(Router);
  const authService = injector.get(AuthService);

  if (!authService.isAuth()) {
    return router.createUrlTree(['auth/login'])
  } 
  return true;
};


