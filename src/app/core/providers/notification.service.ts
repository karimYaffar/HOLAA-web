import { Injectable } from "@angular/core";
import {
  IndividualConfig,
  ProgressAnimationType,
  ToastrService,
} from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private readonly TIME_OUT: number = 3000;
  private readonly PROGRESSBAR: boolean = true;
  private readonly PROGRESSBAR_ANIMATION: ProgressAnimationType = "decreasing";

  constructor(private readonly toastrService: ToastrService) {}


  /**
   * Metodo general para la creacion y personalizacion de las notificaciones
   * @param title Titulo de las notificacion
   * @param message Cuerpo (Mensaje) de la notificacion
   * @param positionClass Posicion que tendra la notificacion
   * @param type  Tipo de notificaciones
   * @param options Opciones de personalziacion de la notificacion
   * @returns 
   */
  show(
    title: string,
    message: string,
    positionClass: 'toast-top-right' | 'toast-top-left' | 'toast-bottom-right' | 'toast-bottom-left',
    type: 'toast-info' | 'toast-success' | 'toast-error' | 'toast-warning',
    options: Partial<IndividualConfig<any>> = {}
  ) {
    return this.toastrService.show(message, title, {
      timeOut: this.TIME_OUT,
      progressBar: this.PROGRESSBAR,
      progressAnimation: this.PROGRESSBAR_ANIMATION,
      positionClass: positionClass,
      ...options
    }, type)
  }

  /**
   * Metodo para mostrar una notificacion de exito
   * @param title titulo que tendra la notificacion
   * @param message mensaje que tendra la notificacion
   * @param options opciones personalizable para la notificacion
   * @returns un objeto ToastrService con atributos Observables
   */
  success(
    title: string,
    message: string,
    options: Partial<IndividualConfig<any>> = {}
  ) {
    return this.toastrService.success(message, title, {
      timeOut: this.TIME_OUT,
      progressBar: this.PROGRESSBAR,
      progressAnimation: this.PROGRESSBAR_ANIMATION,
      ...options,
    });
  }

  error(
    title: string, 
    message: string,
    positionClass: string = "toast-top-right",
  ) {
    return this.toastrService.error(message, title, {
      timeOut: this.TIME_OUT,
      progressBar: this.PROGRESSBAR,
      progressAnimation: this.PROGRESSBAR_ANIMATION,
    });
  }

  warning(
    title: string,
    message: string,
    positionClass: string = "toast-top-right",
  ) {
    return this.toastrService.warning(message, title, {
      timeOut: this.TIME_OUT,
      progressBar: this.PROGRESSBAR,
      progressAnimation: this.PROGRESSBAR_ANIMATION,
    });
  }

  info(title: string, message: string) {
    return this.toastrService.info(message, title, {
      timeOut: this.TIME_OUT,
      progressBar: this.PROGRESSBAR,
      progressAnimation: this.PROGRESSBAR_ANIMATION,
    });
  }
}
