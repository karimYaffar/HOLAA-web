import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from "@angular/common/http";
import { inject, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../providers/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const injector = inject(Injector);
  let isRefreshing = false;

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        const authService = injector.get(AuthService);

        if (isRefreshing) {
          return throwError(() => new Error('El token ya esta refrescado'))
        }

        isRefreshing = true;

        return authService.refreshToken().pipe(
          switchMap((success: boolean) => {
            if (success) {
              return next(req);
            } else {
              authService.logout();
              router.navigate(['/login'])
              return throwError(() => new Error('Session expired'));
            }
          }),
          catchError((refreshError) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshError);
        })
        )
      }
      return throwError(() => error);
    }) 
  )
}