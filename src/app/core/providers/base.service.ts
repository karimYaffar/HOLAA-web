import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, NEVER, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ServerService } from './server.service';

export abstract class BaseService {
  protected readonly API = environment.API;
  protected abstract endpoint: string;
  private server = inject(ServerService);
  protected http = inject(HttpClient);

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {}

    let errorMessage: string =
      'Hubo un problema al momento de procesar la solicitud';

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    console.error(`API Error (${error.status}): ${errorMessage}`);

    return throwError(() => new Error(errorMessage));
  }

  protected handleResponse<T>(response: T): Observable<T> {
    return of(response);
  }

  protected get<T>(path: string = '', options: object = {}): Observable<T> {
    return this.http
    .get<T>(
      `${this.API}/${this.endpoint}${path ? `/${path}` : ''}`,
      options,
    )
    .pipe(
      switchMap((response) => this.handleResponse(response)),
      catchError(this.handleError),
    );
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
