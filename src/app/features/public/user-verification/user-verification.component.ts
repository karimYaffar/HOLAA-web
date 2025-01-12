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
import { AuthService } from '../../../core/providers/auth.http';
import { NotificationService } from '../../../core/providers/notification.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/providers/admin.service';
import { IncidentConfiguration } from '../../../core/interfaces/incident.configuration';
import { DataService } from '../../../core/providers/data.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { error } from 'console';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule,
    SweetAlert2Module,
  ],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.css',
})
export class UserVerificationComponent {
  otpForm: FormGroup;

  canResendOtp: boolean = false;

  @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5')
  otpInputs!: QueryList<ElementRef>;

  incidentConfiguration: Partial<IncidentConfiguration> = {};

 

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly adminService: AdminService,
    private readonly shareDataService: DataService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
    this.otpForm = this.fb.group({
      otp0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      otp5: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  ngOnInit(): void {
    this.adminService.getIncidentConfiguration().subscribe({
      next: (configuration) => {
        this.incidentConfiguration = configuration;
      },
    });
  }

  onInputChange(event: any, index: number): void {
    const input = event.target as HTMLInputElement;

    // Avanzar automáticamente al siguiente campo si se ingresa un número
    if (input.value && index < this.otpInputs.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  getOtpCode(): string {
    // Unir todos los valores del formulario en un solo string
    return Object.values(this.otpForm.value).join('');
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otpCode = this.getOtpCode();

      this.authService.account_verification({ otp: otpCode }).subscribe({
        next: (response: { status: number, message: string, route: string}) => {
          this.notificationService
            .show(
              'Codigo Verificado',
              'Se ha verificado el codigo con exito',
              'toast-top-right',
              'toast-success',
            )
            .onHidden.subscribe({
              next: () => {
                this.router.navigate([response.route]);
              },
            });
        },
        error: () => {
          this.notificationService.show(
            'Expirado o Invalido',
            'Codigo OTP expirado o invalido',
            'toast-top-right',
            'toast-error',
          );
        },
      });
    }
  }

  resendOtpCode(): void {}

  handleCountdownEvent(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.canResendOtp = true;
    }
  }
}
