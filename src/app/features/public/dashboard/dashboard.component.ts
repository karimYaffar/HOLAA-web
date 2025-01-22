import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Definición de los tipos de prendas
  tipos = [
    { name: 'Tops', image: '/assets/images/tops.png' },
    { name: 'Vestidos', image: '/assets/images/vestidos.jpg' },
    { name: 'Jeans', image: '/assets/images/jeans.jpg' },
    { name: 'Interior', image: '/assets/images/interior.jpg' },
    { name: 'Faldas', image: '/assets/images/faldas.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes agregar lógica si necesitas hacer algo cuando el componente se inicie
  }
}
