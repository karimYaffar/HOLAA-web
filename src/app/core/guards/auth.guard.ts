import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, delay, map, of } from "rxjs";
import { CookieService } from "ngx-cookie-service";

export const authGuard: CanActivateFn = (route, state) => {
  // Implementar logica para la activacion de guardian
  // Posible idea identificar si existe cierta cookie para poder validar si el usuario
  // esta autenticado
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const _cookieService = inject(CookieService);

  // Se activa el guarda cuando el usuario inicia sesion
  return _authService.authenticateVerification().pipe(
    map((response: any) => {
      if (response.authenticate || _cookieService.check("authenticate")) {
        _cookieService.set("authenticate", "true", {
          sameSite: "Strict",
          path: "/",
        });
        return true;
      } else {
        return _router.createUrlTree(["/login"]);
      }
    }),
    catchError(() => {
      
      return of(false);
    })
  );
};
