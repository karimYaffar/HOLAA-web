import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const _authService = inject(AuthService);
  const _router = inject(Router);
  const _notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status == HttpStatusCode.Unauthorized) {
        _notificationService.info(
          "Cerrando Sesion...",
          "Limite 15 minutos concluido"
        )
        _router.navigate(['/login']);
      }

      return throwError(error);
    })
  )
};
