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
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  newShowPassword: boolean = false;
  confirmShowPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private toast: HotToastService,
    private readonly router: Router,
    private readonly authService: AuthService,
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

      this.authService.resetPassword(email, newPassword).subscribe({
        next: (res) => {
          this.toast.success('Se ha cambiado con exito la contraseña', { 
            position: 'top-right'
          });
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
