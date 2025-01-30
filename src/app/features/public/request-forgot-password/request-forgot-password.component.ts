import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/providers/auth.service';
import { DataService } from '../../../core/providers/data.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_AGE } from '../../../constants/constants';

@Component({
  selector: 'app-requestpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-forgot-password.component.html',
  styleUrl: './request-forgot-password.component.css',
})
export class RequestForgotPasswordComponent {
  requestForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const email = this.requestForm.value.email;

      this.authService.forgotPassword({ email: email }).subscribe({
        next: (response) => {
          this.notificationService
            .show(
              'Verificacion necesaria',
              'Se ha enviado un codigo de verificacion a su email',
              'toast-top-right',
              'toast-info',
            )
            .onHidden.subscribe({
              next: () => {
                this.dataService.setEmail(email);
                this.cookieService.set('mfaPending', response.fromTo, {
                  expires: COOKIE_AGE,
                });
                
                this.router.navigate(['/account-verification']);
              },
            });
        },
        error: (err) => {
          this.notificationService.show(
            'Estimado Usuario',
            err.message,
            'toast-top-right',
            'toast-warning',
          );
        },
      });
    }
  }
}
