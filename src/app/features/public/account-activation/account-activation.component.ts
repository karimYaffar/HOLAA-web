import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CountdownEvent, CountdownModule } from 'ngx-countdown';
import { AuthService } from '../../../core/providers/auth.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CountdownModule],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css',
})
export class AccountActivationComponent {
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

      this.authService.acoountActivation(otp).subscribe({
        next: (response) => {
          this.notificationService.show(
            'Cuenta Activada Exitosamente',
            response.message,
            'toast-top-right',
            'toast-success'
          ).onHidden.subscribe({
            next: () => {
              this.router.navigate(['/login']);
            }
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
