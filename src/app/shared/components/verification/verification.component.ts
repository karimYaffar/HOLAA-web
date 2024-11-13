import { CommonModule } from "@angular/common";
import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { CountdownEvent, CountdownModule } from 'ngx-countdown';
import { AuthService } from "../../../core/services/auth.service";
import { NotificationService } from "../../../core/services/notification.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AdminService } from "../../../core/services/admin.service";
import { IncidentConfiguration } from "../../../core/interfaces/incident.configuration";

@Component({
  selector: "app-verification",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CountdownModule],
  templateUrl: "./verification.component.html",
  styleUrl: "./verification.component.css",
})
export class VerificationComponent {
  otpForm: FormGroup;

  canResendOtp: boolean = false;

  @ViewChildren('otp0, otp1, otp2, otp3, otp4, otp5')
  otpInputs!: QueryList<ElementRef>;

  incidentConfiguration: Partial<IncidentConfiguration> = {};

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService,
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.otpForm = this.fb.group({
      otp0: ["", [Validators.required, Validators.pattern("[0-9]")]],
      otp1: ["", [Validators.required, Validators.pattern("[0-9]")]],
      otp2: ["", [Validators.required, Validators.pattern("[0-9]")]],
      otp3: ["", [Validators.required, Validators.pattern("[0-9]")]],
      otp4: ["", [Validators.required, Validators.pattern("[0-9]")]],
      otp5: ["", [Validators.required, Validators.pattern("[0-9]")]],
    });
  }

  ngOnInit(): void {
    this.adminService.getIncidentConfiguration().subscribe({
      next: (configuration) => {
        this.incidentConfiguration = configuration;
      }
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
    return Object.values(this.otpForm.value).join("");
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otpCode = this.getOtpCode();
      
      this.authService.accountActivation(otpCode).subscribe({
        next: (res) => {
          this.notificationService.success(
            "Codigo Verificado",
            "Se ha verificado el codigo con exito",
          )
          
          this.cookieService.delete('verification');

          if (this.cookieService.check('verification-email')) {
            this.cookieService.delete('verification-email');
            this.router.navigate(['/reset-password']);
            return;
          }

          if (!this.cookieService.check('verification-auth')) {
            this.router.navigate(['/login'])
          } else {
            this.cookieService.delete('verification-auth');
            this.router.navigate(['/auth']);
          }
          
        },
        error: (err) => {
          console.log(err);
          this.notificationService.error(
            "Expirado o Invalido",
            "Codigo OTP expirado o invalido"
          )
        }
      })
    }
  }

  resendOtpCode(): void {

  }

  handleCountdownEvent(event: CountdownEvent): void {
    if (event.action === 'done') {
      this.canResendOtp = true
    }
  }
}
