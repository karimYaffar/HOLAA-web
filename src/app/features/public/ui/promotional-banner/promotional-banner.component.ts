import { Component, Input } from '@angular/core';

@Component({
  selector: 'promotional-banner',
  standalone: true,
  imports: [],
  template: `<div
    class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12"
  >
    <div class="relative flex justify-center">
      <img
        src="./assets/webp/promo.png"
        alt="Modelos mostrando ropa de temporada"
        class="w-1/2 h-auto"
      />
    </div>

    <div class="flex justify-center flex-col md:text-left space-y-6">
      <h2 class="text-center text-6xl font-bebas text-black mb-2">
        ¡DESCUENTO EXCLUSIVO!
      </h2>
      <div class="text-center text-9xl font-bebas text-black leading-none">
        {{ discountText }}
      </div>
      <p class="text-center font-bebas text-4xl text-black">
        COMPRA AHORA Y AHORRA EN TUS PRENDAS FAVORITAS.
      </p>
      <button
        class="inline-block font-bebas mx-auto px-12 py-4 border-2 border-pink-500 text-black hover:bg-pink-500 hover:text-white transition-colors duration-300 text-3xl"
      >
        COMPRA AHORA
      </button>
    </div>
  </div>`,
})
export class PromotionalBannerComponent {
    @Input() discountText: string = "100%" 
}
