import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.checkSession().pipe(
      map((response) => {
        this.authService.setAuth(response);
        return true;
      }),
      catchError((error) => {
        console.error('Error en el Guard:', error); // Para depurar
        this.router.navigate(['/login']); // Redirige en caso de error
        return of(false); // Bloquea acceso
      }),
    );
  }
}
