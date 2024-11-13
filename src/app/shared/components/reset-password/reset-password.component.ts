import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly dataService: DataService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('newPassword')?.value === group.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.value.newPassword;
      let emailSignal =  this.dataService.getEmail()
      let email = emailSignal()
      console.log(email);
      this.authService.resetPassword(email, newPassword).subscribe({
        next: (res) => {
          this.notificationService.success(
            "Contraseña cambiada",
            "Se ha cambiado con exito la contraseña",
          )
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.notificationService.error(
            "Excepcion producida",
            "Error al momento de cambiar contraseña"
          )
        }
      })
    }
  }
}
