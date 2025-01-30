import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
    UserEmail,
    UserVerification,
    UserWithoutUsername,
} from '../interfaces/users.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  protected override httpOptions = {
    withCredentials: true,
  };

  constructor(protected override readonly http: HttpClient) {
    super(http);
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
        `${this.SERVER}/users/account-verification`,
        user_verification,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  forgot_password(
    user_without_credentials: UserEmail,
  ): Observable<{
    status: number;
    message: string;
  }> {
    return this.http
      .post<{ status: number; message: string }>(
        `${this.SERVER}/users/forgot-password`,
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
    return this.http
      .post<{ status: number; message: string }>(
        `${this.SERVER}/users/reset-password`,
        user_without_username,
        this.httpOptions,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
