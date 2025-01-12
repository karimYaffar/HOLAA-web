import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/providers/admin.service';
import { CompanyProfile } from '../../../core/interfaces/business.profile';
import { ModalService } from 'ngx-modal-ease';
import { VisionMissionComponent } from '../../../shared/components/vision-mission/vision-mission.component';
import { PolicesComponent } from '../../../shared/components/polices/polices.component';
import { ContactsComponent } from '../../../shared/components/contacts/contacts.component';
import { NotificationService } from '../../../core/providers/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  businessProfile: Partial<CompanyProfile> = {};

  constructor(
    private readonly adminService: AdminService,
    private readonly modalService: ModalService,
    private readonly notificationService: NotificationService,
  ) {}

  /**
   * Primero cargamos los datos de la base de datos
   */
  ngOnInit(): void {
    // this.loadBusinessProfile();
  }

  /**
   * Este metodo carga el perfil de la empresa desde la base de datos
   */
  loadBusinessProfile(): void {
    this.adminService.getCompanyProfile().subscribe({
      next: (response) => { this.businessProfile = response; },
      error: () => {
        // this.notificationService.show(
        //   'Tiempo Agotado',
        //   'No se pudo cargar datos del perfil de la empresa',
        //   'toast-bottom-right',
        //   'toast-error'
        // );
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
    this.modalService.open(ContactsComponent);
  }

  qrCodeUrl = '/assets/images/holaatrendyqrcode.png'

  product = {
    name: 'Vestido Floreado',
    description: 'Un gran vestido para ocupar en esta primavera.',
    price: 199.99,
    image: 'https://m.media-amazon.com/images/I/61YkhbEiPQS._AC_SX679_.jpg',
    sizes: ['Small', 'Medium', 'Large'],
    fullDescription: 'Este elegante vestido floreado es perfecto para cualquier ocasión especial. Con un diseño encantador de flores en tonos vibrantes, este vestido evoca frescura y feminidad. Confeccionado en una tela ligera y transpirable, ofrece comodidad durante todo el día, siendo ideal para los meses más cálidos.',
  };

  reviews = [
    { name: 'John Doe', date: 'November 10, 2024', comment: 'Amazing product! Really loved it.' },
    { name: 'Jane Smith', date: 'October 25, 2024', comment: 'Good quality, would buy again.' },
  ];

  selectedSize = 'Medium';
  quantity = 1;

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    alert(`Added ${this.quantity} of ${this.product.name} to the cart.`);
  }

  buyNow(): void {
    alert(`Proceeding to buy ${this.quantity} of ${this.product.name}.`);
  }
}
