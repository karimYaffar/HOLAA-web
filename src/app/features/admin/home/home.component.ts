import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeAdminComponent {
  constructor(private readonly router: Router) {}
     isRootAdminRoute(): boolean {
      return this.router.url === '/admin';
  }
}
