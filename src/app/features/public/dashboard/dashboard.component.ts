import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../../core/services/admin.service';
import { CompanyProfile } from '../../../core/interfaces/business.profile';
import { ModalService } from 'ngx-modal-ease';
import { VisionMissionComponent } from '../../../shared/components/vision-mission/vision-mission.component';
import { PolicesComponent } from '../../../shared/components/polices/polices.component';
import { ContactsComponent } from '../../../shared/components/contacts/contacts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [CookieService]
})
export class DashboardComponent implements OnInit {

  businessProfile: Partial<CompanyProfile> = {}

  constructor(
    private readonly adminService: AdminService,
    private readonly modalService: ModalService
  ) {}

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

  /**
   * Metodo para mostrar informacion sobre vision y mision
   */
  aboutVisionMisionCompany(): void {
    this.modalService.open(VisionMissionComponent);
  }
  
  /**
   * Metodo para mostrar informacion sobre las politicas
   */
  aboutPolicesCompany(): void {
    this.modalService.open(PolicesComponent);
  }

  /**
   * Metodo para mostrar informacion de contacto de la empresa
   */
  aboutContactCompany(): void {
    this.modalService.open(ContactsComponent)
  }


}
