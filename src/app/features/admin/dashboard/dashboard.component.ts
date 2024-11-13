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
  isSubMenu1Open = false; 
  isSubMenu1Open2 = false;
  toggleSubMenu1() {
    this.isSubMenu1Open = !this.isSubMenu1Open;
  }
  toggleSubMenu2() {
    this.isSubMenu1Open2 = !this.isSubMenu1Open2;
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

              this.authService.stopTokenRefreshCycle();
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
