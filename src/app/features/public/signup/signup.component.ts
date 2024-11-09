import { Component } from "@angular/core";
import { PrommobannerComponent } from "../prommobanner/prommobanner.component";
import { gsap } from "gsap";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { NotificationService } from "../../../core/services/notification.service";
import { AuthService } from "../../../core/services/auth.service";
import { CommonModule, Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [PrommobannerComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
  providers: [CookieService],
})
export class SignupComponent {
  registerForm: FormGroup;

  

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(8)]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
        ],
      ],
      confirmPassword: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      //Obtencion de los datos
      const { username, email, password } = this.registerForm.value;

      // Implementar logica para el registro y peticion al backend
      // se debe de enviar los datos enviar al siguiente pagina que es login

      // Enviamos al login para que se pueda authenticar
      this.notificationService.success('Exito', 'Registro completado con exito').onHidden.subscribe({
        next: () => {

          // Implementacion de la logica de envio de correo electronico de activacion
          // este sucede cuando se envia los datos, se validan y por ultimo se registran
          // entonces en este caso la mejor practica sseria un servicio compartido para guardar el correo
          // Lo ideal seria SMS O OTP

          // Enviamos a la nueva ruta
          this.router.navigate(['/login']);
        }
      })
    } else {
      this.notificationService.error('Ups...', 'Por favor de revisar los campos')
    }
  }

}
