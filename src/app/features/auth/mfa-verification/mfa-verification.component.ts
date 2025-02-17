import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/providers/auth.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { Router } from '@angular/router';
import { CountdownEvent, CountdownModule } from 'ngx-countdown';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-mfa-verification',
    imports: [CommonModule, CountdownModule, FormsModule, ReactiveFormsModule],
    templateUrl: './mfa-verification.component.html',
    styleUrl: './mfa-verification.component.css'
})
export class MfaVerificationComponent {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otpForm: FormGroup;
  canResendOtp = false;
  incidentConfiguration = {
    otpLifeTime: 300,
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {
    this.otpForm = this.fb.group({
      otp0: ['', [Validators.required, Validators.maxLength(1)]],
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  ngOnInit(): void {}

  onInputChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.value && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (
      event.key === 'Backspace' &&
      index > 0 &&
      !this.otpForm.get(`otp${index}`)?.value
    ) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  handleCountdownEvent(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.canResendOtp = true;
    }
  }

  resendOtp(): void {
    // Implement resend OTP logic here
    this.canResendOtp = false;
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');

      const fromTo = this.cookieService.get('mfaPending');

      this.cookieService.delete('mfaPending');

      this.authService.accountVerification(otp).subscribe({
        next: (response) => {
          this.notificationService
            .show(
              'Verificacion exitosa',
              response.message,
              'toast-top-right',
              'toast-success',
            )
            .onHidden.subscribe({
              next: () => {
                console.log('Valor de fromTo:', fromTo);
                console.log('Tipo de fromTo:', typeof fromTo);
                console.log('Comparación:', fromTo !== 'FORGOT_PASSWORD');
                console.log('Normalizado:', fromTo?.trim().toUpperCase());
                if (fromTo === 'FORGOT_PASSWORD') {
                  this.router.navigate(['/reset-password']);
                } else {
                  this.router.navigate(['/']);
                }
              },
            });
        },
        error: (error) => {
          this.notificationService.show(
            'Estimado usuario',
            error.message,
            'toast-top-right',
            'toast-info',
          );
        },
      });
    }
  }
}
