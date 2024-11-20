import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  catchError,
  interval,
  Observable,
  Subscription,
  throwError,
} from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly BASE_URL = environment.BASE_URL;

  private httpOptions = {
    withCredentials: true,
  };

  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Metodo para iniciar sesion, este se conecta al endpoint
   * para enviar las credenciales y verificar si existen
   * @param email
   * @param password
   * @returns
   */
  logIn(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        `${this.BASE_URL}/auth/logIn`,
        { username: username, password: password },
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para cerrar sesion, este se conecta al endpoint del backend
   * @returns 
   */
  logOut(): Observable<{ status: boolean; message: string }> {
    return this.httpClient
      .get<{ status: boolean; message: string }>(
        `${this.BASE_URL}/auth/logOut`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para registrar un usuario este se conecta a un endpoint
   * de la base de datos
   * @param username
   * @param email 
   * @param password 
   * @returns 
   */
  signIn(
    username: string,
    email: string,
    password: string
  ): Observable<{ status: number; message: string }> {
    const signInDto = {
      username: username,
      email: email,
      password: password,
    };
    return (
      this.httpClient
        .post<{ status: number; message: string }>(
          `${this.BASE_URL}/auth/signIn`,
          signInDto
        )
        .pipe(
          catchError((error) => {
            return throwError(() => new Error(error.error.message));
          })
        )
    );
  }

  /**
   * Metodo para activacion de cuenta, esta se maneja mediante un codigo 
   * OTP que se envia al correo electronico del usuario
   * @param otp 
   * @returns 
   */
  accountActivation(
    otp: string
  ): Observable<{ status: number; message: string }> {
    return this.httpClient
      .post<{ status: number; message: string }>(
        `${this.BASE_URL}/auth/account-activation`,
        { otp } 
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  requestPassword(email: string): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/auth/request-password`, { email }).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );;
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.httpClient
      .put(
        `${this.BASE_URL}/auth/reset-password`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  authenticateVerification(): Observable<{ authenticate: boolean }> {
    // El usuario una vez que se haya logueado automaticamente el guardian actuara
    // activando esta solicitud que solo verifica el envio de la cookie
    // y regresando true para obtener la respues solicitada y verificar
    // que claro el usuario esta authenticado
    return this.httpClient
      .get<{ authenticate: boolean }>(
        `${this.BASE_URL}/auth/authenticate-verification`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }


}
