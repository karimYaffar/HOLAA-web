import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
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
      const { username, password } = this.loginForm.value;

      // Implementacion de la logica para enviar datos al backend y recuperar
      // JWT con los datos cifrados

      // Enviamos a la nueva ruta que es el auth dashboard
      
      this.authService.logIn(username, password).subscribe({
        next: (res) => {
          this.notificationService
            .success(
              "Bienvenido administrador",
              "Que bueno que esta devuelta"
            )
            .onHidden.subscribe({
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
