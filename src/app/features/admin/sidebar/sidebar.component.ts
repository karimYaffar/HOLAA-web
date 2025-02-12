import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    imports: [],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  logout() {
    // Implement logout logic
    console.log('Logout clicked');
  }
}
