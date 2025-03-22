import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../providers/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  return true;
};
