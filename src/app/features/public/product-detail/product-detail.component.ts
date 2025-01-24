import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],  // Importar el CommonModule
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  product = {
    code: 'P001',
    name: 'Vestido Mini con Olanes y Estampado Floral Negro',
    imgUri: ['assets/images/vestido.jpg'],
    description: 'Modelo: 1,73 cms de altura y talla CH. 93% Viscosa, 3% Lino.',
    price: 299.00,
    stock: 15,
    size: ['CH - S', 'MD - M', 'GD - L', 'XGD - XL'],
    colors: ['NEGRO', 'BLANCO'],
  };

  selectedSize: string | null = null;

  selectSize(size: string) {
    this.selectedSize = size;
  }
}
