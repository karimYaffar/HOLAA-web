import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../../core/interfaces/cart.interface';
import { CartService } from '../../../core/providers/cart.service';
import { CartItemComponent } from '../ui/cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    id: '',
    cartItems: [],
    isActive: false,
  };
  subTotal: number = 0.0;

  constructor(private readonly cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((cart) => {
      this.cart = cart;
      this.calculateSubTotal();
    });
  }

  calculateSubTotal() {
    if (
      !this.cart ||
      !this.cart.cartItems ||
      this.cart.cartItems.length === 0
    ) {
      this.subTotal = 0.0;
      return;
    }

    this.subTotal = this.cart.cartItems.reduce((acc, cartItem) => {
      const priceString = String(cartItem.product.price).replace(
        /[^0-9.]/g,
        '',
      );
      const price = Number(priceString);

      const quantity = Number(cartItem.quantity);

      if (isNaN(price) || isNaN(quantity)) {
        return acc;
      }

      return acc + price * quantity;
    }, 0);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', {
      style: 'decimal', 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2, 
    })
  }

  onIncreaseQuantity(productCode: string, quantity: number) {
    this.cartService
      .updateQuantityProductToCart({
        productCode: productCode,
        quantity: quantity + 1,
      })
      .subscribe((response) => {
        this.cart = response.data;
        this.calculateSubTotal();
      });
  }

  onDecreaseQuantity(productCode: string, quantity: number) {
    this.cartService
      .updateQuantityProductToCart({
        productCode: productCode,
        quantity: quantity - 1,
      })
      .subscribe((response) => {
        this.cart = response.data;
        this.calculateSubTotal();
      });
  }

  onDeleteProduct(productCode: string) {
    this.cartService.removeProductToCart(productCode).subscribe((response) => {
      this.cart = response.data;
    });
  }
}
