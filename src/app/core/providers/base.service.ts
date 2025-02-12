import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ToastifyService } from './toastify.service';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export abstract class BaseService {
  protected readonly API = environment.API;
  protected abstract endpoint: string;

  protected http = inject(HttpClient);

  private toastifyService = inject(ToastifyService);

  protected abstract options: {};

  protected handleError(error: HttpErrorResponse): Observable<never> {
    this.toastifyService.onError(error.message)
    return throwError(() => new Error('Hubo un problema al momento procesar la solicitud'))
  }

  protected get<T>(path: string = '', options: object = {}): Observable<T> {
    return this.http.get<T>(`${this.API}/${this.endpoint}/${path}`, options)
      .pipe(catchError(this.handleError));
  }

  protected post<T>(path: string = '', body: any, options: object = {}): Observable<T> {
    return this.http.post<T>(`${this.API}/${this.endpoint}/${path}`, body, options)
      .pipe(catchError(this.handleError))
  }

  protected put<T>(path: string = '', body: Partial<any>, options: object = {}): Observable<T> {
    return this.http.put<T>(`${this.API}/${this.endpoint}/${path}`, body, options)
      .pipe(catchError(this.handleError))
  }

  
}
