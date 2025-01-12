import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { PrommobannerComponent } from '../../../shared/components/prommobanner/prommobanner.component';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/providers/notification.service';
import { AuthService } from '../../../core/providers/auth.http';
import { CookieService } from 'ngx-cookie-service';
import { VRF_PROCESS_AGE } from '../../../constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PrommobannerComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly location: Location,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: () => {
          // Enviamos notificacion al cliente
          this.notificationService
            .show(
              'Verificacion Necesaria',
              'Se requiere autenticacion, hemos enviado un codigo a su correo electronico asociado',
              'toast-top-right',
              'toast-success',
            )
            .onHidden.subscribe({
              next: () => {
                this.router.navigate(['/verification']);
              },
            });
        },
        error: (err) => {
          this.notificationService.show(
            'Estimado Usuario',
            `${err.message}`,
            'toast-top-right',
            'toast-info',
          );
        },
      });
    } else {
      this.notificationService.show(
        'Ups...',
        'Por favor ingrese bien los campos',
        'toast-top-right',
        'toast-warning',
      );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
