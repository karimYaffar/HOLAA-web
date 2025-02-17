import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_AGE } from '../../../core/constants/constants';
import { AuthService } from '../../../core/providers/auth.service';
import { DataService } from '../../../core/providers/data.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-requestpassword',
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
    private readonly toast: HotToastService,
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

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.toast
            .success('Se ha enviado un codigo de verificacion a su correo', {
              position: 'top-right',
            })
            .afterClosed.subscribe({
              next: () => {
                this.dataService.setEmail(email);
                this.cookieService.set('mfaPending', response.fromTo, {
                  expires: COOKIE_AGE,
                });

                this.router.navigate(['/account-verification']);
              },
            });
        },
      });
    }
  }
}
