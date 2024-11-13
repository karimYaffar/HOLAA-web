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
  private readonly api = environment.API;
  private refreshSubscription: Subscription | null = null;
  private readonly REFRESH_INTERVAL = 10 * 60 * 1000;

  private httpOptions = {
    withCredentials: true,
  };

  constructor(private readonly httpClient: HttpClient) {}

  logIn(email: string, password: string): Observable<any> {
    const logInDto = {
      email: email,
      password: password,
    };

    // Implementacion de la logica para enviar una peticion post
    // Y esperar el mensaje 202 o excepcion para mostrar dependiendo
    // cual sea el caso
    return (
      this.httpClient
        .post(`${this.api}/auth/logIn`, logInDto, this.httpOptions)
        // Recibimos en caso de que ocurra una excepcion en el backend
        .pipe(
          catchError((error) => {
            return throwError(() => new Error(error.error.message));
          })
        )
    );
  }

  logOut(): Observable<{ status: boolean; message: string }> {
    return this.httpClient
      .get<{ status: boolean; message: string }>(
        `${this.api}/auth/logOut`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

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
    // Implementacion de la logica para registar un usuario y
    // mas aparte para evitar excepciones o errores inesperados
    return (
      this.httpClient
        .post<{ status: number; message: string }>(
          `${this.api}/auth/signIn`,
          signInDto
        )
        // Manejador de errores en caso de que ocurra una exceepcion inesperada
        .pipe(
          catchError((error) => {
            return throwError(() => new Error(error.error.message));
          })
        )
    );
  }

  accountActivation(
    otp: string
  ): Observable<{ status: number; message: string }> {
    return this.httpClient.post<{ status: number; message: string }>(
      `${this.api}/auth/account-activation`,
      { otp }
    );
  }

  requestPassword(email: string): Observable<any> {
    return this.httpClient.post(`${this.api}/auth/request-password`, { email });
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.httpClient.put(
      `${this.api}/auth/reset-password`,
      { email, password },
      this.httpOptions
    );
  }

  authenticateVerification(): Observable<{ authenticate: boolean }> {
    // El usuario una vez que se haya logueado automaticamente el guardian actuara
    // activando esta solicitud que solo verifica el envio de la cookie
    // y regresando true para obtener la respues solicitada y verificar
    // que claro el usuario esta authenticado
    return this.httpClient.get<{ authenticate: boolean }>(
      `${this.api}/auth/authenticate-verification`,
      this.httpOptions
    );
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post(
      `${this.api}/auth/refresh-token`,
      {},
      this.httpOptions
    );
  }

  // Inicia el ciclo de renovación del token
  startTokenRefreshCycle() {
    this.stopTokenRefreshCycle(); // Detenemos cualquier ciclo anterior

    // Configura un intervalo para refrescar el token periódicamente
    this.refreshSubscription = interval(this.REFRESH_INTERVAL).subscribe(() => {
      this.refreshToken().subscribe({
        next: () => {
          console.log("Token refreshed");
        },
        error: (err) => {
          console.error("Error refreshing token:", err);
          this.stopTokenRefreshCycle();
          // Aquí puedes manejar el caso de expiración de sesión (redirigir al login, etc.)
        },
      });
    });
  }

  // Detiene el ciclo de renovación del token
  stopTokenRefreshCycle() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
      this.refreshSubscription = null;
    }
  }
}
