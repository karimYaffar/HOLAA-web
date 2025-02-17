import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { AddProduct, Cart, UpdateQuantity } from '../interfaces/cart.interface';
import { ApiResponse } from "../interfaces/api.response.interface";

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {

  protected override endpoint = 'cart';

  constructor() { super(); }

  getCart(): Observable<Cart> {
    return this.get<Cart>('', { withCredentials: true });
  }

  addProductToCart(addProduct: AddProduct): Observable<ApiResponse> {
    return this.post<ApiResponse>('add', addProduct, { withCredentials: true })
  }

  updateQuantityProductToCart(updateQuantity: UpdateQuantity): Observable<ApiResponse> {
    return this.put<ApiResponse>('update/quantity', updateQuantity, { withCredentials: true })
  }

  removeProductToCart(productCode: string): Observable<ApiResponse> {
    return this.delete<ApiResponse>('remove/product', { productCode: productCode }, { withCredentials: true } )
  }


  

}