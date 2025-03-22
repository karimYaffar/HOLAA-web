import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { AccountConfirmationComponent } from '../../features/auth/account-activation/account-confirmation.component';
import { AuthService } from '../providers/auth.service';

/**
 * Guard for account activation pending
 * Verifies if the user has a pending account activation
 * @param route Used to get the current route
 * @param state Used to get the current state
 * @returns Returns true if the user has a pending account activation, otherwise returns a redirect to the home page
 */
export const accountConfirmationPendingGuard: CanActivateFn = (
  route,
  state,
) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  if (!cookieService.check('accountConfirmationPending')) {
    return router.createUrlTree(['/']);
  }

  return true;
};

export const accountConfirmationLeaveGuard: CanDeactivateFn<
  AccountConfirmationComponent
> = async (component, currentRoute, currentState, nextState) => {
  const cookieService = inject(CookieService);

  if (component.isConfirmed()) {
    return true;
  }

  if (
    !confirm(
      '¿Estás seguro de querer cancelar el proceso de activacion de cuenta?',
    )
  ) {
    return false;
  }

  try {
    cookieService.delete('accountConfirmationPending', '/');

    return true;
  } catch (error) {
    console.error('Error al cancelar la activación de la cuenta:', error);
    return false;
  }
};
