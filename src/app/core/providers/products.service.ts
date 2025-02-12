import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
    Products,
    ProductsWithoutCode,
} from '../interfaces/products.interface';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  protected override options = {
    withCredentials: true,
  };

  constructor(protected override readonly http: HttpClient) {
    super(http);
  }

  /**
   * Metodo que obtiene todos los productos desde la API
   */
  getProducts(): Observable<Products[]> {
    return this.http
      .get<Products[]>(`${this.API}/products`, this.options)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  /**
   * Metodo que obtiene todos los products por categoria
   */
  getProductsByCategory(category: string): Observable<Products[]> {
    return this.http
      .get<Products[]>(`${this.API}/products/by-category/${category}`)
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
    color: string
    
  ): Observable<Products[]> {
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

   

    return this.http
      .get<Products[]>(`${this.API}/products/filter`, {
        params,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  /**
   * Metodo para crear un producto
   * @param data estructura para crear un producto
   * @returns respuesta del servidor
   */
  createProduct(data: Products): Observable<any> {
    return this.http
      .post(`${this.API}/products/create`, data, this.options)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  searchProducts(keyword: string): Observable<Products[]> {
    const encodedKeyword = encodeURIComponent(keyword);
    return this.http
      .get<Products[]>(`${this.API}/products/search?keyword=${encodedKeyword}`)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  updateProduct(
    id: string | undefined,
    data: Partial<ProductsWithoutCode>,
  ): Observable<Products> {
    return this.http
      .put<Products>(
        `${this.API}/products/update/${id}`,
        data,
        this.options,
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
