import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Audit } from '../../../core/interfaces/audit';
import { AdminService } from '../../../core/providers/admin.service';
import { NotificationService } from '../../../core/providers/notification.service';
@Component({
    selector: 'app-audit',
    imports: [CommonModule],
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {

  auditInformation: Audit[] = [];
  displayedAuditInformation: Audit[] = []; 
  currentPage: number = 1;
  auditsPerPage: number = 6; 
  totalAudits: number = 0;
  

  constructor(private readonly adminService: AdminService,
    private readonly notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    this.loadAuditInformation();
  }

  loadAuditInformation(): void {
    this.adminService.getAuditData().subscribe({
      next: (info) =>  {
        this.auditInformation = info;
        this.totalAudits = info.length;
        this.setPage(1);
      },
      error: (err) => {
        console.error(err);
        this.notificationService.error("Excepcion Producida", "No se pudieron obtener los datos de la auditoria");
      }
    })
  }

   // Establece los datos a mostrar para la página actual
   setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.auditsPerPage;
    const endIndex = startIndex + this.auditsPerPage;
    this.displayedAuditInformation = this.auditInformation.slice(startIndex, endIndex);
  }

  // Calcula el número total de páginas
  getTotalPages(): number[] {
    return Array(Math.ceil(this.totalAudits / this.auditsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }


}
