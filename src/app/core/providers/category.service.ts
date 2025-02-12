import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../interfaces/categories.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  protected override options = {
    withCredentials: true,
  };

  /**
   * Obtiene todas las categorias desde la API
   * @returns Regresa observable de todas las categorias
   */
  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.API}/category`, this.options)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
