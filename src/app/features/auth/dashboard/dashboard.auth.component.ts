import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BusinessProfile } from '../../../core/interfaces/business.profile';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-dashboard.auth',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.auth.component.html',
  styleUrl: './dashboard.auth.component.css'
})
export class DashboardAuthComponent implements OnInit {

  businessProfile: Partial<BusinessProfile> = {}

  constructor(private readonly authService: AuthService,
    private readonly adminService: AdminService,
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


  /**
   * Primero cargamos los datos de la base de datos
   */
  ngOnInit(): void {
    this.loadBusinessProfile();
  }

  /**
   * Metodo para cargar la configuracion de incidencia de la base de datos
   */
  loadBusinessProfile(): void {
    this.adminService.getBusinessProfile().subscribe({
      next: (profile) => {
        this.businessProfile = profile;
      },
    });
  }
}
