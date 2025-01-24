import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModalService } from 'ngx-modal-ease';
import { CompanyProfile } from '../../../core/interfaces/business.profile';
import { AdminService } from '../../../core/providers/admin.service';
import { AuthService } from '../../../core/providers/auth.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { ContactsComponent } from '../../../shared/components/contacts/contacts.component';
import { PolicesComponent } from '../../../shared/components/polices/polices.component';
import { VisionMissionComponent } from '../../../shared/components/vision-mission/vision-mission.component';

@Component({
  selector: 'app-dashboard.auth',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.auth.component.html',
  styleUrl: './dashboard.auth.component.css'
})
export class DashboardAuthComponent implements OnInit {

  businessProfile: Partial<CompanyProfile> = {}

  constructor(private readonly authService: AuthService,
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly cookieService: CookieService,
  ) {}

  logOut(): void {
    
    this.authService.logout().subscribe({
      next: (res) => {
        this.notificationService
          .success("Sesion Cerrada Exitosamente", `${res.message}`)
          .onHidden.subscribe({
            next: () => {
              this.cookieService.delete('authenticate');
              this.router.navigate(["/"]);
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
    // this.sessionTimer.startTimer();
  }

  /**
   * Metodo para cargar la configuracion de incidencia de la base de datos
   */
  loadBusinessProfile(): void {
    this.adminService.getCompanyProfile().subscribe({
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
