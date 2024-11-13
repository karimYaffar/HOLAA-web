import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { DataService } from '../../../core/services/data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requestpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './requestpassword.component.html',
  styleUrl: './requestpassword.component.css'
})
export class RequestPasswordComponent {
  requestForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly dataService: DataService,
    private readonly notificationService: NotificationService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      const email = this.requestForm.value.email;
  
      this.authService.requestPassword(email).subscribe({
        next:(res) => {
          this.notificationService.success(
            "Verificacion necesaria",
            "Se ha enviado un codigo de verificacion a su email"
          )

          this.cookieService.set('verification', 'true', {
            sameSite: 'Strict',
            path: '/'
          });

          this.cookieService.set('verification-email', 'true', {
            sameSite: 'Strict',
            path: '/'
          });

          this.dataService.setEmail(email);

          this.router.navigate(['/verification']);

        },
        error:(err) => {
          this.notificationService.error(
            "Excepcion producida",
            "Error al momento de pedir peticion de recuperar contraseña"
          )
        }
      });

    }
  }
}
