import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  BusinessProfile,
  UpdateBusinessProfile,
} from "../../../core/interfaces/business.profile";
import { SocialSite, UpdateSocialSite } from "../../../core/interfaces/social.site";
import { AdminService } from "../../../core/services/admin.service";
import { NotificationService } from "../../../core/services/notification.service";

@Component({
  selector: "app-business",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"],
})
export class BusinessComponent implements OnInit {
  businessProfile: Partial<BusinessProfile> = {};
  updateBusinessProfile: Partial<UpdateBusinessProfile> = {};
  


  

  /**
   * Constructor para inicializar los datos
   */
  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService
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
      error: (err) => {
        console.log(err);
        this.notificationService.error(
          "Excepcion producida",
          "Error al momento de cargar el perfil de la empresa"
        );
      },
    });
  }

  /**
   * Abre el widget de Cloudinary para subir un logo y actualiza `logoUrl` en `businessProfile` cuando se sube con éxito
   */
  openCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: "dntrj0gde",
        uploadPreset: "HOLAA_IMAGEN",
        sources: ["local", "url"],
        multiple: false,
        clientAllowedFormats: ["webp"],
        maxImageFileSize: 2000000,
        cropping: true,
        croppingAspectRatio: 1,
        folder: "logos",
        transformation: [{ width: 300, height: 300, crop: "limit" }],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          this.businessProfile.logo = result.info.secure_url;
          this.updateIncidentConfiguration();
          this.notificationService.success(
            "Logo Actualizado",
            "El logo se ha actualizado con exito"
          );
        }
      }
    );
    widget.open();
  }

  /**
   * Metodo para guardar informacion del slogan
   */
  updateIncidentConfiguration() {

    const { _id, create_date, update_date, ...profile } = this.businessProfile

    this.updateBusinessProfile = profile

    this.adminService
      .updateBussinesProfile(
        this.businessProfile._id,
        this.updateBusinessProfile
      )
      .subscribe({
        next: (response) => {
          this.notificationService.success(
            "Actualizacion Exitosa",
            response.message
          ).onHidden.subscribe({
            next: () => {
              this.loadBusinessProfile();
            }
          });
        },
        error: (error) => {
          this.notificationService.error(
            "Excepcion Producida",
            "No se pudieron actualizar los datos del perfil"
          );
        },
      });
  }

 
}
