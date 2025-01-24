import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Products, ProductsWithoutCode } from '../interfaces/products.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  protected override httpOptions = {
    withCredentials: true,
  };

  constructor(protected override readonly httpClient: HttpClient) {
    super(httpClient);
  }

  /**
   * Metodo que obtiene todos los productos desde la API
   */
  getProducts(): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(`${this.SERVER}/products`, this.httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  /**
   * Metodo que obtiene todos los products por categoria
   */
  getProductsByCategorie(categorie: string): Observable<Products[]> {
    return this.httpClient
      .get<Products[]>(`${this.SERVER}/products/by-category/${categorie}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      )
  }

	/**
	 * Metodo para crear un producto 
	 * @param data estructura para crear un producto
	 * @returns respuesta del servidor
	 */
  createProduct(data: Products): Observable<any> {
    return this.httpClient
      .post(`${this.SERVER}/products/create`,
				data,
				this.httpOptions
			)
      .pipe(
				catchError((error) => {
					return throwError(() => new Error(error.error.message))
				})
			);
  }

	updateProduct(
		id: string | undefined,
		data: Partial<ProductsWithoutCode>
	): Observable<Products> {
		return this.httpClient
			.put<Products>(`${this.SERVER}/products/update/${id}`,
				data,
				this.httpOptions
			)
			.pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
	}
}
