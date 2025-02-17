import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { catchError, NEVER, Observable, of, throwError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

export abstract class BaseService {
  protected readonly API = environment.API;
  protected abstract endpoint: string;

  protected http = inject(HttpClient);

  protected handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage =
      error.error?.message ||
      'Ocurrió un error inesperado. Inténtalo de nuevo más tarde.';
    console.warn("Estado de Conexion del Servidor:", error.status === 0 ? "Desconectado": "Conectado", )
    console.error('Razon:', error.error.message);

    return of();
  }

  protected get<T>(path: string = '', options: object = {}): Observable<T> {
    if (path != '') {
      return this.http
        .get<T>(`${this.API}/${this.endpoint}/${path}`, options)
        .pipe(catchError(this.handleError));
    }
    return this.http
      .get<T>(`${this.API}/${this.endpoint}`, options)
      .pipe(catchError(this.handleError));
  }

  protected post<T>(
    path: string = '',
    body: any,
    options: object = {},
  ): Observable<T> {
    return this.http
      .post<T>(`${this.API}/${this.endpoint}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  protected put<T>(
    path: string = '',
    body: Partial<any>,
    options: object = {},
  ): Observable<T> {
    return this.http
      .put<T>(`${this.API}/${this.endpoint}/${path}`, body, options)
      .pipe(catchError(this.handleError));
  }

  protected delete<T>(
    path: string = '',
    body: any,
    options: object = {},
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.API}/${this.endpoint}/${path}`, {
        body: body,
        ...options,
      })
      .pipe(catchError(this.handleError));
  }
}
