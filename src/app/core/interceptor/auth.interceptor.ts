import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { inject, Injector, signal } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Servicio de autenticación
  const router = inject(Router); // Router para redirecciones
  let isRefreshing = false; // Bandera para evitar múltiples solicitudes de refresco

  // Manejar errores 401 (token expirado)
  const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn) => {
    if (!isRefreshing) {
      isRefreshing = true;

      return authService.refreshToken().pipe(
        switchMap(() => {
          isRefreshing = false;
          // Reintentar la solicitud original después de refrescar el token
          return next(request);
        }),
        catchError((error) => {
          isRefreshing = false;
          // Si el refresh token también falla, cerrar sesión
          authService.logout();
          router.navigate(['/login']); // Redirigir al login
          return throwError(() => error);
        })
      );
    } else {
      // Si ya se está refrescando el token, lanzar un error
      return throwError(() => new Error('Token refresh in progress'));
    }
  };

  // Continuar con la solicitud y manejar errores
  return next(req).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === HttpStatusCode.Unauthorized && // Error 401
        !req.url.includes('refresh-token') // Evitar bucle en la solicitud de refresco
      ) {
        return handle401Error(req, next);
      }
      return throwError(() => error);
    })
  );
};
