import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/providers/auth.service';
import { NotificationService } from '../../../core/providers/notification.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardAdminComponent {
  isSidebarOpen = true;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {}

  logOut(): void {
    
    this.authService.logout().subscribe({
      next: (res) => {
        this.notificationService
          .success("Sesion Cerrada Exitosamente", `${res.message}`)
          .onHidden.subscribe({
            next: () => {

              this.router.navigate(["/login"]);
            },
          });
      },
      error: (err) => {
        this.notificationService.info(
          "Estimado Usuario",
          `${err.message}`
        );
      },
    })
  }
}
