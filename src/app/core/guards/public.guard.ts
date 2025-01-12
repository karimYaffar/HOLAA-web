import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../providers/auth.http';
import { catchError, map, of } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

export const publicGuard: CanActivateFn = (route, state) => {
  // Injectamos el servicio de autenticacion para poder obtener el siguiente paso de la verificacion del cliente
  const auth_service = inject(AuthService);
  const router = inject(Router);

  const urlSegment = route.url;
  const uri = urlSegment[0].path;
  
  if (uri.localeCompare('verification') === 0) {
    return auth_service.verification_status().pipe(
      map((response: { status: number }) => {
        if (response.status === HttpStatusCode.Ok) {
          return true;
        } else {
          return router.createUrlTree(['/']);
        }
      }),
      catchError(() => {
        return of(router.createUrlTree(['/']));
      }),
    );
  }

  if (uri.localeCompare('reset-password') === 0) {
    return auth_service.forgot_password_status().pipe(
      map((response: { status: number }) => {
        if (response.status === HttpStatusCode.Ok) {
          return true;
        } else {
          return router.createUrlTree(['/request-forgot-password']);
        }
      }),
      catchError(() => {
        return of(router.createUrlTree(['/request-forgot-password']));
      }),
    );
  }

  return false;
};
