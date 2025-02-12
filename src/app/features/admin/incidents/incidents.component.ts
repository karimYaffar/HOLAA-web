import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailConfiguration, UpdateEmailConfiguration } from '../../../core/interfaces/emal.configuration';
import { IncidentConfiguration, UpdateIncidentConfiguration } from '../../../core/interfaces/incident.configuration';
import { AdminService } from '../../../core/providers/admin.service';
import { NotificationService } from '../../../core/providers/notification.service';

@Component({
    selector: 'app-incidents',
    imports: [CommonModule, FormsModule],
    templateUrl: './incidents.component.html',
    styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {
  // Configuración del correo
  emailConfiguration: Partial<EmailConfiguration> = {}
  updateEmailConfiguration: UpdateEmailConfiguration = {}

  // Configuración del módulo de incidencias
  incidentConfiguration: Partial<IncidentConfiguration> = {}
  updateIncidentConfiguration: UpdateIncidentConfiguration = {}


  // Configuración del filtro de usuarios bloqueados por días
  blockedUserFilterDays: number = 0;

  /**
   * Constructor para inicializar aspectos del componente de configuracion
   * @param adminService 
   * @param notificationService 
   */
  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService
  ) {
  }

  /**
   * Metodo inicializador de configuraciones
   */
  ngOnInit(): void {
    this.loadIncidentConfiguration();
    this.loadEmailConfiguration();
  }

  /**
   * Metodo para cargar la configuracion del modulo de incidencias
   */
  loadIncidentConfiguration(): void {
    this.adminService.getIncidentConfiguration().subscribe({
      next: (configuration) => {
        
        this.incidentConfiguration = configuration
      },
      error: (err) => {
        this.notificationService.error(
          "Excepcion producida: Configuracion Incidencias",
          "Error al cargar datos de configuracion"
        )
      }
    })
  }


  /**
   * Metodo para cargar la configuracion del modelo de email
   */
  loadEmailConfiguration(): void {
    this.adminService.getEmailConfiguration().subscribe({
      next: (configuration) => {
        this.emailConfiguration = configuration
      },
      error: (err) => {
        this.notificationService.error(
          "Excepcion Producida: Configuracion Email",
          "Error al cargar datos de configuracion"
        )
      }
    })
  }

  /**
   * Metodo que actualiza la configuracion de email
   */
  editEmailConfiguration(): void {
    const { _id, ...configuration }  = this.emailConfiguration;

    this.updateEmailConfiguration = configuration;

    this.adminService.updateEmailConfiguration(
      _id,
      this.updateEmailConfiguration
    ).subscribe({
      next: (response) => {
        this.notificationService.success("Actualizacion Exitosa", response.message);
        this.loadEmailConfiguration();
      },
      error: (err) => {
        this.notificationService.error(
          "Excepcion Producida: Configuracion Email",
          "Error al actualizar datos de configuracion"
        )
      }
    })
  }

  /**
   * Metodo que actualiza la configuracion de incidencias
   */
  editIncidentConfiguration(): void {
    const { _id, ...configuration }  = this.incidentConfiguration;

    this.updateIncidentConfiguration = configuration;

    this.adminService.updateIncidentConfiguration(
      _id,
      this.updateIncidentConfiguration
    ).subscribe({
      next: (response) => {
        this.notificationService.success("Actualizacion Exitosa", response.message);
        this.loadIncidentConfiguration();
      },
      error: (err) => {
        this.notificationService.error(
          "Excepcion Producida: Configuracion Email",
          "Error al actualizar datos de configuracion"
        )
      }
    })
  }

}
