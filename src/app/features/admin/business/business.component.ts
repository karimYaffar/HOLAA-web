import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface BusinessProfile {
  slogan: string;
  logoUrl: string | null;
  titlePage: string;
  address: string;
  email: string;
  phone: string;
}

interface SocialSite {
  name: string;
  icon: string;
  url: string;
  description?: string;
}

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent {
  businessProfile: BusinessProfile = {
    slogan: '',
    logoUrl: null, // Inicia con null hasta que se suba un logo
    titlePage: '',
    address: '',
    email: '',
    phone: ''
  };

  socialSites: SocialSite[] = [];
  socialData: Partial<SocialSite> = {};
  isEditMode = false;
  selectedSocialIndex?: number;

  /**
   * Abre el widget de Cloudinary para subir un logo y actualiza `logoUrl` en `businessProfile` cuando se sube con éxito
   */
  openCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'dntrj0gde',
        uploadPreset: 'HOLAA_IMAGEN',
        sources: ['local', 'url'],
        multiple: false,
        clientAllowedFormats: ['webp'],
        maxImageFileSize: 2000000,
        cropping: true,
        croppingAspectRatio: 1,
        folder: 'logos',
        transformation: [{ width: 300, height: 300, crop: 'limit' }],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          this.businessProfile.logoUrl = result.info.secure_url;
          console.log('Logo subido con éxito. URL:', this.businessProfile.logoUrl);
        }
      }
    );
    widget.open();
  }
  

  // Métodos para guardar cada sección de la información general
  saveSlogan() {
    console.log('Slogan guardado:', this.businessProfile.slogan);
    // Implementar lógica para guardar en backend si es necesario
  }

  saveTitlePage() {
    console.log('Título de la página guardado:', this.businessProfile.titlePage);
    // Implementar lógica para guardar en backend si es necesario
  }

  saveAddress() {
    console.log('Dirección guardada:', this.businessProfile.address);
    // Implementar lógica para guardar en backend si es necesario
  }

  saveEmail() {
    console.log('Correo electrónico guardado:', this.businessProfile.email);
    // Implementar lógica para guardar en backend si es necesario
  }

  savePhone() {
    console.log('Teléfono guardado:', this.businessProfile.phone);
    // Implementar lógica para guardar en backend si es necesario
  }

  /**
   * Abre el modal para añadir una red social o prepara el formulario para añadir una nueva entrada
   */
  openAddSocialModal() {
    this.isEditMode = false;
    this.selectedSocialIndex = undefined;
    this.socialData = {
      name: '',
      icon: '',
      url: '',
      description: ''
    };
  }

  /**
   * Añade o actualiza una red social en la lista
   */
  addSocialSite() {
    if (!this.isEditMode) {
      // Agrega una nueva red social
      this.socialSites.push({
        name: this.socialData.name!,
        icon: this.socialData.icon!,
        url: this.socialData.url!,
        description: this.socialData.description
      });
    } else if (this.selectedSocialIndex !== undefined) {
      // Edita una red social existente
      this.socialSites[this.selectedSocialIndex] = {
        ...this.socialSites[this.selectedSocialIndex],
        ...this.socialData
      };
    }
    this.clearSocialForm();
  }

  /**
   * Edita una red social existente por índice
   */
  editSocialSite(index: number) {
    this.isEditMode = true;
    this.selectedSocialIndex = index;
    this.socialData = { ...this.socialSites[index] };
  }

  /**
   * Elimina una red social por índice
   */
  deleteSocialSite(index: number) {
    this.socialSites.splice(index, 1);
  }

  /**
   * Limpia el formulario de redes sociales y resetea el modo de edición
   */
  clearSocialForm() {
    this.socialData = {};
    this.isEditMode = false;
    this.selectedSocialIndex = undefined;
  }
}
