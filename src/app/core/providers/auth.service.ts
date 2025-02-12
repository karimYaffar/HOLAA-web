import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api.response.interface';
import { LoginResponse, SignUpResponse } from '../interfaces/auth.interface';
import {
    User,
    UserCredentials,
    UserEmail,
    UserResetPassword,
    UserVerification
} from '../interfaces/users.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private isLogged = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  protected override options = {
    withCredentials: true,
  };

  constructor(protected override readonly http: HttpClient) {
    super(http);
    this.checkSession().subscribe(
      (isLoggedIn) => {
        this.setAuth(isLoggedIn);
        if (isLoggedIn) {
          this.fetchCurrentUser();
        }
      }
    );
  }

  /**
   * Metodo que devuelve si el cliente esta autenticado o no
   * @returns Regresa el estado del cliente si esta autenticado
   */
  isAuth(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  setAuth(v: boolean): void {
    this.isLogged.next(v);
  }

  /**
   * Metodo para enviar datos al servidor y autenticar al cliente
   * @param email Correo electronico del cliente
   * @param password Contraseña del cliente
   * @returns
   */
  login(userCredentials: UserCredentials): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.API}/auth/login`,
        userCredentials,
        this.options,
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          if (response.status === 200) {
            this.setAuth(true);
            this.fetchCurrentUser();
          }
        })
      );
  }

  /**
   * Metodo para registrar un cliente a la base de datos
   * @param username
   * @param email
   * @param password
   * @returns
   */
  signup(user: User): Observable<SignUpResponse> {
    return this.http
      .post<SignUpResponse>(
        `${this.API}/auth/signup`,
        user,
        this.options,
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Metodo para cerrar sesion, este se conecta al endpoint del backend
   * @returns
   */
  logout(): Observable<{ status: boolean; message: string }> {
    return this.http
      .get<{ status: boolean; message: string }>(
        `${this.API}/auth/logout`,
        this.options,
      )
      .pipe(
        catchError(this.handleError),
        tap(() => {
          this.setAuth(false);
          this.currentUserSubject.next(null);
        })
      );
  }

  acoountActivation(otp: string): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(
        `${this.API}/auth/activate`,
        { otp },
        this.options,
      )
      .pipe(catchError(this.handleError));
  }

  accountVerification(otp: string): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.API}/mfa/verify`, { otp }, this.options)
      .pipe(catchError(this.handleError));
  }

  checkSession(): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.API}/auth/check-session`, null, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('Error en checkSession:', error);
          return of(false);
        }),
      );
  }

  /**
   * Metodo que se conecta con el endpoint para poder verificar la cuenta del usuario
   * @param user_verification
   * @returns
   */
  account_verification(user_verification: UserVerification): Observable<{
    status: number;
    message: string;
    route: string;
  }> {
    return this.http
      .post<{ status: number; message: string; route: string }>(
        `${this.API}/auth/account-verification`,
        user_verification,
        this.options,
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  forgotPassword(userEmail: UserEmail): Observable<{
    status: number;
    message: string;
    MFA: string;
    fromTo: string;
  }> {
    return this.http
      .post<{
        status: number;
        message: string;
        MFA: string;
        fromTo: string;
      }>(
        `${this.API}/auth/request/forgot-password`,
        userEmail,
        this.options,
      )
      .pipe(catchError(this.handleError));
  }

  resetPassword(userResetPassword: UserResetPassword): Observable<{
    status: number;
    message: string;
  }> {
    return this.http
      .post<{ status: number; message: string }>(
        `${this.API}/auth/reset-password`,
        userResetPassword,
        this.options,
      )
      .pipe(catchError(this.handleError));
  }

  authenticateVerification(): Observable<{ authenticate: boolean }> {
    // El usuario una vez que se haya logueado automaticamente el guardian actuara
    // activando esta solicitud que solo verifica el envio de la cookie
    // y regresando true para obtener la respues solicitada y verificar
    // que claro el usuario esta authenticado
    return this.http
      .get<{ authenticate: boolean }>(
        `${this.API}/auth/authenticate-verification`,
        this.options,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  private fetchCurrentUser(): void {
    this.http.get<User>(`${this.API}/auth/current-user`, this.options)
      .pipe(catchError(this.handleError))
      .subscribe(user => {
        this.currentUserSubject.next(user);
      });
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  updateCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }
}