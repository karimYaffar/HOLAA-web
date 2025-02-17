import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product, ProductsWithoutCode } from '../interfaces/products.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  private options = {
    withCredentials: true,
  };

  protected override endpoint = 'products';

  constructor(protected override readonly http: HttpClient) {
    super();
  }

  /**
   * Metodo que obtiene todos los productos desde la API
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API}/products`, this.options).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      }),
    );
  }

  /**
   * Metodo que obtiene todos los products por categoria
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.API}/products/by-category/${category}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  getFilteredProducts(
    category: string,
    subCategory: string,
    size: string,
    minPrice: number,
    maxPrice: number,
    color: string,
  ): Observable<Product[]> {
    let params: any = {};

    params.category = category;

    if (subCategory) {
      params.subCategory = subCategory;
    }

    if (size) {
      params.size = size;
    }
    if (color) {
      params.color = color;
    }

    if (minPrice) {
      params.minPrice = minPrice;
    }

    if (maxPrice) {
      params.maxPrice = maxPrice;
    }

    return this.get<Product[]>('filter', { params });
  }

  /**
   * Metodo para crear un producto
   * @param data estructura para crear un producto
   * @returns respuesta del servidor
   */
  createProduct(data: Product): Observable<any> {
    return this.http
      .post(`${this.API}/products/create`, data, this.options)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const encodedKeyword = encodeURIComponent(keyword);
    return this.http
      .get<Product[]>(`${this.API}/products/search?keyword=${encodedKeyword}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  updateProduct(
    id: string | undefined,
    data: Partial<ProductsWithoutCode>,
  ): Observable<Product> {
    return this.http
      .put<Product>(`${this.API}/products/update/${id}`, data, this.options)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
