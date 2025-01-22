import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  showDropdown = false;
  tipo: string = '';
  productos: any[] = [];

  constructor(private route: ActivatedRoute) {}

  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tipo = params['tipo'];
      this.loadProductsByTipo(this.tipo);
    });
  }

  loadProductsByTipo(tipo: string) {
    const allProducts = [
      { name: 'Camiseta', color: 'Rojo', price: 20, sizes: ['S', 'M', 'L'], image: '/assets/images/camiseta.jpg', type: 'Tops' },
      { name: 'Vestido Largo', color: 'Negro', price: 50, sizes: ['M', 'L'], image: '/assets/images/vestido.jpg', type: 'Vestidos' },
    ];

    this.productos = allProducts.filter(product => product.type === tipo);
  }

  // Método selectSize para manejar la selección de una talla
  selectSize(size: string) {
    console.log('Talla seleccionada:', size);
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
