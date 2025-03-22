import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmailVerificationComponent } from '../../features/auth/email-verification/email-verification.component';
import { AuthService } from '../providers/auth.service';
import { NavbarComponent } from '../../features/public/navbar/navbar.component';

export const emailVerificationPendingGuard: CanActivateFn = (route, state) => {
  
  const cookieService = inject(CookieService);

  const router = inject(Router);

  if (!cookieService.check('emailVerificationPending')) {
    return router.createUrlTree(['/']);
  }

  return true;
};

export const emailVerificationLeaveGuard: CanDeactivateFn<
  NavbarComponent
> = async (component, currentRoute, currentState, nextState) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);

  component.ngOnInit();

  return true;
};
