import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/providers/auth.service';
import { NotificationService } from '../../../core/providers/notification.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginAdminComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Obtenemos los datos
      const credentials = this.loginForm.value;

      // Implementacion de la logica para enviar datos al backend y recuperar
      // JWT con los datos cifrados

      // Enviamos a la nueva ruta que es el auth dashboard
      
      this.authService.login(credentials.username, credentials.password).subscribe({
        next: (res) => {
          this.notificationService
            .success(
              "Bienvenido administrador",
              "Que bueno que esta devuelta"
            )          .onHidden.subscribe({
              next: () => {
                // Implementacion de la logica para guardar la cookie de manera segura
                // Enviamos a la nueva ruta

                this.router.navigate(["/admin"]);
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
        "Por favor ingrese bien los campos"
      );
    }
  }
}
