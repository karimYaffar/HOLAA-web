import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Importa Router

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tipos = [
    { name: 'Tops', image: '/assets/images/tops.png' },
    { name: 'Vestidos', image: '/assets/images/vestidos.jpg' },
    { name: 'Jeans', image: '/assets/images/jeans.jpg' },
    { name: 'Interior', image: '/assets/images/interior.jpg' },
    { name: 'Faldas', image: '/assets/images/faldas.jpg' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectToProduct(tipoName: string) {
    // Redirige a la ruta de productos de ese tipo
    this.router.navigate(['/productos', tipoName]);
  }
}