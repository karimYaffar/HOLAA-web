import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectSize(size: string) {
    console.log('Talla seleccionada:', size);
    this.showDropdown = false;
  }
}
