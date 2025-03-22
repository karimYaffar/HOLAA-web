import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SmsVerficationComponent } from '../../features/auth/sms-verification/sms-verification.component';

export const smsVerificationPendingGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (!cookieService.check('smsVerificationPending')) {
    return router.createUrlTree(['/']);
  }

  return true;
};

export const smsVerificationLeaveGuard: CanDeactivateFn<
  SmsVerficationComponent
> = (component, currentRoute, currentState, nextState) => {
  

  const wantGoBack = confirm('¿Estás seguro de querer cancelar el proceso de verificacion de numero de telefono?')

  if (!wantGoBack) {
    return false;
  }

  return true;

};
