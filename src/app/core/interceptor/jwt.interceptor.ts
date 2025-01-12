import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../providers/auth.http';
import { Router } from '@angular/router';
import { NotificationService } from '../providers/notification.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req)

};
