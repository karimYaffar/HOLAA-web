import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface EmailConfiguration {
  title: string;
  content: string;
  footer: string;
}

interface IncidentConfiguration {
  maxFailedAttempts: number;
  blockDuration: number;
}

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css'],
})
export class IncidentsComponent {
  // Configuración del correo
  emailConfig: EmailConfiguration = {
    title: '',
    content: '',
    footer: ''
  };

  // Configuración del módulo de incidencias
  incidentConfig: IncidentConfiguration = {
    maxFailedAttempts: 0,
    blockDuration: 0
  };

  // Configuración del filtro de usuarios bloqueados por días
  blockedUserFilterDays: number = 0;

  /**
   * Guarda la configuración del correo.
   */
  saveEmailConfig() {
    console.log('Configuración del correo guardada:', this.emailConfig);
    // Lógica para enviar `emailConfig` al backend si es necesario
  }

  /**
   * Guarda la configuración de intentos fallidos y duración del bloqueo.
   */
  saveIncidentConfig() {
    console.log('Configuración de intentos fallidos y duración del bloqueo guardada:', this.incidentConfig);
    // Lógica para enviar `incidentConfig` al backend si es necesario
  }

  /**
   * Guarda el filtro de usuarios bloqueados por días.
   */
  saveBlockedUserFilterDays() {
    console.log('Filtro de usuarios bloqueados por días guardado:', this.blockedUserFilterDays);
    // Lógica para enviar `blockedUserFilterDays` al backend si es necesario
  }
}
