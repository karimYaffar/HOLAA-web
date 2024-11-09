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

  console.log("HOLA");

  // Se activa el guarda cuando el usuario inicia sesion
  _authService.authenticateVerification().pipe(
    map(res => {console.log(res.authenticate)}),
    catchError(() => of(false))
  );

  return true
};
