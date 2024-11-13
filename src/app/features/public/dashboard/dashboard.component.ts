import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../../core/services/admin.service';
import { BusinessProfile } from '../../../core/interfaces/business.profile';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [CookieService]
})
export class DashboardComponent implements OnInit {

  businessProfile: Partial<BusinessProfile> = {}

  constructor(private readonly adminService: AdminService) {}

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
