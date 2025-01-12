import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/providers/auth.http';
import { NotificationService } from '../../../core/providers/notification.service';
import { Router } from '@angular/router';
import { DataService } from '../../../core/providers/data.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  newShowPassword: boolean = false;
  confirmShowPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
    private readonly dataService: DataService,
  ) {
    this.resetForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch },
    );
  }

  dialogExitConfirm(): Promise<SweetAlertResult<any>> {
     return Swal.fire({
          title: '¿Desea terminar el proceso de olvidar contraseña?',
          icon: 'question',
          showConfirmButton: true,
          confirmButtonText: 'Si',
          confirmButtonColor: '#28A745',
          showCancelButton: true,
          cancelButtonText: 'No',
          cancelButtonColor: '#DC3545',
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('newPassword')?.value ===
      group.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  toggleNewPasswordVisibility(): void {
    this.newShowPassword = !this.newShowPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmShowPassword = !this.confirmShowPassword;
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.value.newPassword;
      const email = this.dataService.getEmail();
      this.authService.reset_password({ email: email, password: newPassword }).subscribe({
        next: (res) => {
          this.notificationService.success(
            'Contraseña cambiada',
            'Se ha cambiado con exito la contraseña',
          );
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.notificationService.error(
            'Excepcion producida',
            'Error al momento de cambiar contraseña',
          );
        },
      });
    }
  }
}
