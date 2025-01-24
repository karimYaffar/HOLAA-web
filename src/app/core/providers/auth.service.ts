import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import {
  User,
  UserVerification,
  UserWithoutCredentials,
  UserWithoutUsername,
} from '../interfaces/users.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private isAuthenticate = new BehaviorSubject<boolean>(false);

  protected override httpOptions = {
    withCredentials: true,
  };

  constructor(protected override readonly httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Metodo que devuelve si el cliente esta autenticado o no
   * @returns Regresa el estado del cliente si esta autenticado
   */
  stateAuthenticate(): boolean {
    return this.isAuthenticate.value;
  }

  /**
   * Metodo para enviar datos al servidor y autenticar al cliente
   * @param email Correo electronico del cliente
   * @param password Contraseña del cliente
   * @returns
   */
  login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        `${this.SERVER}/auth/login`,
        { username: username, password: password },
        this.httpOptions,
      )
      .pipe(
        map(() => this.isAuthenticate.next(true)),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  /**
   * Metodo para registrar un cliente a la base de datos
   * @param username
   * @param email
   * @param password
   * @returns
   */
  signup(
    username: string,
    email: string,
    password: string,
  ): Observable<{ status: number; message: string }> {
    const signInDto = {
      username: username,
      email: email,
      password: password,
    };
    
    return this.httpClient
      .post<{ status: number; message: string }>(
        `${this.SERVER}/auth/signup`,
        signInDto,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  /**
   * Metodo para cerrar sesion, este se conecta al endpoint del backend
   * @returns
   */
  logout(): Observable<{ status: boolean; message: string }> {
    return this.httpClient
      .get<{ status: boolean; message: string }>(
        `${this.SERVER}/auth/logOut`,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  /**
   * Metodo que se conecta con el endpoint para poder verificar el estado de la cuenta del usuario
   * @returns Regresa el estado de la verificacion del usuario
   */
  verification_status(): Observable<{ status: number }> {
    return this.httpClient
      .get<{ status: number }>(
        `${this.SERVER}/auth/verification-status`,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
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
    return this.httpClient
      .post<{ status: number; message: string; route: string }>(
        `${this.SERVER}/auth/account-verification`,
        user_verification ,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  forgot_password_status(): Observable<{ status: number }> {
    return this.httpClient
      .get<{ status: number }>(
        `${this.SERVER}/auth/forgot-password-status`,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  forgot_password(
    user_without_credentials: UserWithoutCredentials,
  ): Observable<{
    status: number;
    message: string;
  }> {
    return this.httpClient
      .post<{ status: number; message: string }>(
        `${this.SERVER}/auth/forgot-password`,
        user_without_credentials,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  reset_password(user_without_username: UserWithoutUsername): Observable<{
    status: number;
    message: string;
  }> {
    return this.httpClient
      .post<{ status: number; message: string }>(
        `${this.SERVER}/auth/reset-password`,
        user_without_username,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  authenticateVerification(): Observable<{ authenticate: boolean }> {
    // El usuario una vez que se haya logueado automaticamente el guardian actuara
    // activando esta solicitud que solo verifica el envio de la cookie
    // y regresando true para obtener la respues solicitada y verificar
    // que claro el usuario esta authenticado
    return this.httpClient
      .get<{ authenticate: boolean }>(
        `${this.SERVER}/auth/authenticate-verification`,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
