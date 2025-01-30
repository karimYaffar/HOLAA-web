import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../interfaces/categories.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  protected override httpOptions = {
    withCredentials: true,
  };

  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.SERVER}/category`, this.httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
