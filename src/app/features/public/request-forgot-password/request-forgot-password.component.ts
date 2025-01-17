import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/providers/auth.http';
import { DataService } from '../../../core/providers/data.service';
import { NotificationService } from '../../../core/providers/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-forgot-password.component.html',
  styleUrl: './request-forgot-password.component.css'
})
export class RequestForgotPasswordComponent {
  requestForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const email = this.requestForm.value.email;

      
      this.authService.forgot_password({ email: email }).subscribe({
        next:() => {
          this.notificationService.show(
            "Verificacion necesaria",
            "Se ha enviado un codigo de verificacion a su email",
            "toast-top-right",
            "toast-info"
          ).onHidden.subscribe({
            next: () => {
              this.dataService.setEmail(email);
              this.router.navigate(['/verification']);
            }
          })
        },
        error:(err) => {
          this.notificationService.show(
            "Estimado Usuario",
            err.message,
            "toast-top-right",
            "toast-warning"
          )
        }
      });

    }
  }
}
