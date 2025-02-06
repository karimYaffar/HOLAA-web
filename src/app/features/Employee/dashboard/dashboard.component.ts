import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  mainMenuItems: MenuItem[] = [
    { icon: 'fa-chart-line', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fa-users', label: 'Empleados', route: '/employees' },
    { icon: 'fa-clipboard-list', label: 'Asistencia', route: '/attendance' },
    { icon: 'fa-money-bill', label: 'Nómina', route: '/payroll' },
  ];

  catalogItems: MenuItem[] = [
    { icon: 'fa-box', label: 'Productos', route: '/products' },
    { icon: 'fa-tags', label: 'Categorías', route: '/categories' },
    { icon: 'fa-store', label: 'Sucursales', route: '/branches' },
  ];

  helpItems: MenuItem[] = [
    { icon: 'fa-question-circle', label: 'FAQ', route: '/faq' },
    { icon: 'fa-book', label: 'Manual de Usuario', route: '/manual' },
    { icon: 'fa-headset', label: 'Soporte', route: '/support' },
  ];

  // Puedes agregar métodos para manejar eventos aquí
  toggleSidebar() {
    // Implementar lógica para toggle en móvil
  }

  logout() {
    // Implementar lógica de cierre de sesión
  }
}