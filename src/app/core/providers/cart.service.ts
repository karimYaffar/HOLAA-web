import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IApiResponse } from "../interfaces/api.response.interface";
import { AddProduct, Cart, UpdateQuantity } from '../interfaces/cart.interface';
import { BaseService } from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {

  protected override endpoint = 'cart';

  constructor() { super(); }

  getCart(): Observable<Cart> {
    return this.get<Cart>('' , { withCredentials: true });
  }

  addProductToCart(addProduct: AddProduct): Observable<IApiResponse> {
    return this.post<IApiResponse>('add', addProduct, { withCredentials: true })
  }

  updateQuantityProductToCart(updateQuantity: UpdateQuantity): Observable<IApiResponse> {
    return this.put<IApiResponse>('update/quantity', updateQuantity, { withCredentials: true })
  }

  removeProductToCart(productCode: string): Observable<IApiResponse> {
    return this.delete<IApiResponse>('remove/product', { productCode: productCode }, { withCredentials: true } )
  }


  

}