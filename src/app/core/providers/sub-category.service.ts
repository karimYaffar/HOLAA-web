import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SubCategory } from '../interfaces/sub-category.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends BaseService {

  protected override options = {
    withCredentials: true,
  };

  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  /**
	 * Metodo que obtiene todas las sub categorias de una categoria especifica
	 */
	getSubCategoriesByCategory(category: string): Observable<SubCategory[]> {
		return this.http.get<SubCategory[]>(
			`${this.API}/sub-category/by-category/${category}`, this.options
		).pipe(
			catchError((error) => {
				return throwError(() => new Error(error.error.message))
			})
		)
	}
}
