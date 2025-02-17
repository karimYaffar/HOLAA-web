import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../core/interfaces/products.interface';
import { UnpicImageDirective, UnpicSourceDirective } from "@unpic/angular";

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, UnpicImageDirective],
  template: `
    <div
      class="bg-white border rounded-lg hover:shadow-lg transition-all duration-300 group"
    >
      <div class="p-4">
        <!-- Imagen y Botones -->
        <div
          class="aspect-w-3 aspect-h-4 mb-4 relative overflow-hidden rounded-lg"
        >
          <img
            unpic
            [src]="product.imgUri || '/assets/images/placeholder.jpg'"
            [alt]="product.name"
            class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
          <!-- Botón de favoritos (estático por ahora) -->
          <button
            class="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 group/fav z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-rose-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>

        <!-- Información del producto -->
        <div class="space-y-2">
          <!-- Nombre del producto -->
          <h2 class="text-lg font-medium hover:text-blue-600 line-clamp-2">
            {{ product.name }}
          </h2>

          <!-- Descripción del producto -->
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ product.description || 'Sin descripción disponible' }}
          </p>

          <!-- Precio y Botón de agregar al carrito -->
          <div class="flex items-center justify-between gap-4 pt-2">
            <span class="text-2xl font-semibold">{{ product.price }}</span>
            <!-- Botón de agregar al carrito (estático por ahora) -->
            <button
              (click)="addToCart()"
              class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <g
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    d="m3.062 15.193l.365-2.071c.432-2.448.647-3.672 1.502-4.397S7.012 8 9.467 8h5.066c2.455 0 3.683 0 4.538.725s1.07 1.949 1.502 4.397l.365 2.071c.598 3.388.896 5.082-.023 6.195c-.92 1.112-2.62 1.112-6.017 1.112H9.102c-3.398 0-5.097 0-6.017-1.113s-.62-2.806-.023-6.194M7.5 8l.168-2.014a4.347 4.347 0 0 1 8.664 0L16.5 8"
                  />
                  <path
                    d="M15 11c-.13 1.413-1.434 2.5-3 2.5S9.13 12.413 9 11"
                  />
                </g>
              </svg>
              <span class="text-sm">Agregar</span>
            </button>
          </div>

          <!-- Colores disponibles -->
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <span>Colores:</span>
            <span class="font-medium">{{ product.colors.length || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCartEvent = new EventEmitter<string>();

  addToCart() {
    this.addToCartEvent.emit(this.product.code);
  }
}
