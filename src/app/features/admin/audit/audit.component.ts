import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface AuditEntry {
  username: string;
  action: string;
  date: Date;
  detail: string;
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent {
  auditEntries: AuditEntry[] = [
    { username: 'johndoe', action: 'Inicio de sesión', date: new Date('2023-01-01T10:20:30'), detail: 'Inicio de sesión exitoso.' },
    { username: 'janedoe', action: 'Intento de acceso', date: new Date('2023-01-02T14:22:00'), detail: 'Intento de acceso fallido.' },
    { username: 'mike89', action: 'Actualización de perfil', date: new Date('2023-01-03T09:15:45'), detail: 'Perfil actualizado con éxito.' },
    // Agrega más entradas de auditoría según sea necesario
  ];
}
