import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { Product, ProductsWithoutCode } from '../interfaces/products.interface';
import { BaseService } from './base.service';
import { IApiResponse } from '../interfaces/api.response.interface';

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
   * Get all product provide of the API
   * @returns An observable that resolves when the products is successfully retrieved
   */
  getProducts(): Observable<Product[]> {
    return this.get<Product[]>();
  }

  /**
   * Get all products by view
   * @param view view's name provide to the data base
   * @returns An observable than resolves when the products is successfully retrieved
   */
  getProductsByView(
    view: 'new-arrivals' | 'best-offers' | 'best-sellers',
  ): Observable<Product[]> {
    return this.get<Product[]>(`view/${view}`).pipe(
      shareReplay(1),
    );
  }

  /**
   * 
   * @param keyword keyword for search product
   * @returns 
   */
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

  getProductByCode(code: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-code/${code}`);
  }

  // Metodo que obtieene los productos por categoria
  getProductsByCategory(category: string): Observable<IApiResponse> {
    return this.get<IApiResponse>(`by-category/${category}`).pipe(
      shareReplay(1),
    )
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
