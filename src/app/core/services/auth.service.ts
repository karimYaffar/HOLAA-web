import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly api = environment.API;

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
        .post(`${this.api}/auth/logIn`, logInDto, {})
        // Recibimos en caso de que ocurra una excepcion en el backend
        .pipe(
          catchError((error) => {
            return throwError(() => new Error(error.error.message));
          })
        )
    );
  }

  signIn(username: string, email: string, password: string) {
    const signInDto = {
      username: username,
      email: email,
      password: password,
    };
    // Implementacion de la logica para registar un usuario y
    // mas aparte para evitar excepciones o errores inesperados
    return (
      this.httpClient
        .post(`${this.api}/auth/signIn`, signInDto, {})
        // Manejador de errores en caso de que ocurra una exceepcion inesperada
        .pipe(
          catchError((error) => {
            return throwError(() => new Error(error.error.message));
          })
        )
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
}
