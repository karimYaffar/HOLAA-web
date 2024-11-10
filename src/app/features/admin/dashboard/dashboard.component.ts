import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardAdminComponent {
  isSubMenu1Open = false; 
  isSubMenu1Open2 = false;
  toggleSubMenu1() {
    this.isSubMenu1Open = !this.isSubMenu1Open;
  }
  toggleSubMenu2() {
    this.isSubMenu1Open2 = !this.isSubMenu1Open2;
  }
}
