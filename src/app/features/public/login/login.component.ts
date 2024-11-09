import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule, Location } from "@angular/common";
import { PrommobannerComponent } from "../prommobanner/prommobanner.component";
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PrommobannerComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Obtenemos los datos
      const { email, password } = this.loginForm.value;

      // Implementacion de la logica para enviar datos al backend y recuperar
      // JWT con los datos cifrados

      // Enviamos a la nueva ruta que es el auth dashboard
      
      this.authService.logIn(email, password).subscribe({
        next: (res) => {
          this.notificationService
            .success("Verificacion Necesaria", `${res.message}`)
            .onHidden.subscribe({
              next: () => {
                // Implementacion de la logica para guardar la cookie de manera segura
                // Enviamos a la nueva ruta
                this.router.navigate(["auth/dashboard"]);
              },
            });
        },
        error: (err) => {
          this.notificationService.info(
            "Estimado Usuario",
            `${err.message}`
          );
        },
      });
    } else {
      this.notificationService.error(
        "Ups...",
        "Parece que las credenciales son incorrectas"
      );
    }
  }
}
