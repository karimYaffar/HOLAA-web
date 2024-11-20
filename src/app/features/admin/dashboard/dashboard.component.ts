import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CookieService } from 'ngx-cookie-service';


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
    
    this.authService.logOut().subscribe({
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
