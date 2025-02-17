import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha-2';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';
import { COOKIE_AGE } from '../../../core/constants/constants';
import { AuthService } from '../../../core/providers/auth.service';
import { FormControlComponent } from '../../../shared/ui/form-control/form-control.component';
import { FormPasswordControlComponent } from '../../../shared/ui/form-password-control/form-password-control.component';
import { FormPhoneControlComponent } from '../../../shared/ui/form-phone-control/form-phone-control.component';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormControlComponent,
    FormPasswordControlComponent,
    FormPhoneControlComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [CookieService],
})
export class SignupComponent{
  registerForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  formProgress = 0;
  showRequirements = false;
  isLoading = false;
  requirements = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  };
  SITE_KEY: string = environment.GOOGLE_API_URL;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toast: HotToastService,
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        captchaToken: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch },
    );
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  checkPasswordStrength() {
    const password = this.registerForm.get('password')?.value;

    this.requirements = {
      length: password.length >= 8 && password.length <= 20,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const phoneNumber = '+52' + this.registerForm.get('phone')?.value;
      const user = this.registerForm.value;

      this.authService
        .signup(user.username, user.email, user.password, phoneNumber)
        .subscribe({
          next: (response) => {
            this.toast.success(response.message, {
              position: 'top-right'
            }).afterClosed.subscribe({
              next: () => {
                this.cookieService.set(
                  'accountPending',
                  response.account_activation,
                  {
                    expires: COOKIE_AGE,
                    path: '/',
                  },
                );
                this.router.navigate(['/account-activation']);
              },
            });
          },
        });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resolved(captchaResponse: string | null) {
    this.registerForm.get('captchaToken')?.setValue(captchaResponse);
  }

}
