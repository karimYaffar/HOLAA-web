import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../providers/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  // Implementar logica para la activacion de guardian
  // Posible idea identificar si existe cierta cookie para poder validar si el usuario
  // esta autenticado
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const _cookieService = inject(CookieService);

  // Se activa el guarda cuando el usuario inicia sesion
  return _authService.authenticateVerification().pipe(
    map((response: any) => {
      if (response.authenticate && response.role == 'admin' || _cookieService.check("authenticate-admin")) {
        _cookieService.set("authenticate-admin", "true", {
          sameSite: "None",
          secure: true,
          path: "/",
        });
        return true;
      } else {
        return _router.createUrlTree(["/ht/admin/login"]);
      }
    }),
    catchError((err) => {
      return of(false);
    })
  );
};
