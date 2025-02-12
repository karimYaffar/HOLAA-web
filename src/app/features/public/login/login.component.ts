import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_AGE } from '../../../core/constants/constants';
import { AuthService } from '../../../core/providers/auth.service';
import { NotificationService } from '../../../core/providers/notification.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.notificationService
            .show(
              'Verificacion Necesaria',
              'Se requiere autenticacion, hemos enviado un codigo a su correo electronico asociado',
              'toast-top-right',
              'toast-success',
            )
            .onHidden.subscribe({
              next: () => {
                this.cookieService.set('mfaPending', response.fromTo, {
                  expires: COOKIE_AGE,
                });
                this.router.navigate(['/account-verification']);
              },
            });
        },
        error: (err) => {
          console.log(err);
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
