import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordStrengthService } from '../../core/providers/password-strength.service';
import { CommonModule } from '@angular/common';
import { PasswordStrengthMeterComponent } from "../password-strength-meter/password-strength-meter.component";

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PasswordStrengthMeterComponent],
  templateUrl: './signup-modal.component.html',
  styleUrl: './signup-modal.component.css'
})
export class SignupModalComponent {
  @Output() close = new EventEmitter<void>();
  signupForm: FormGroup;
  showPassword = false;
  passwordStrength: any;

  constructor(
    private fb: FormBuilder,
    private passwordStrengthService: PasswordStrengthService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.signupForm.get(field);
    return formField ? (formField.invalid && formField.touched) : false;
  }

  onPasswordChange(event: Event) {
    const password = (event.target as HTMLInputElement).value;
    this.passwordStrength = this.passwordStrengthService.checkStrength(password);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Aquí iría la lógica para enviar los datos al servidor
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
