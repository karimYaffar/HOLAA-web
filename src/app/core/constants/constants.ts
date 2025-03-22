import { InjectionToken } from "@angular/core";

/* Intervalo de 14 minutos para poder actualizar JWT */
export const JWT_INTERVAL = 14 * 60 * 1000;

/* Intervalo de 15 minutos para el proceso de verificacion */
export const VRF_PROCESS_AGE = 15 * 60 * 1000;

export const PATH_IMAGE = "./assets/webp";

/* Edad de la cookie por defecto 2 minutos */
export const COOKIE_AGE = 2 * 60 * 1000;


export const WINDOW = new InjectionToken<Window>('Window', {
  providedIn: 'root',
  factory: () => window
})