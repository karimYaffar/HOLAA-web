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
import { UnpicImageDirective } from '@unpic/angular';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_AGE } from '../../../core/constants/constants';
import { AuthService } from '../../../core/providers/auth.service';
import { FormControlComponent } from '../../../shared/ui/form-control/form-control.component';
import { FormPasswordControlComponent } from '../../../shared/ui/form-password-control/form-password-control.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormControlComponent,
    FormPasswordControlComponent,
    UnpicImageDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isLoading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toast: HotToastService,
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = this.loginForm.value;

      this.authService
        .login(credentials.username, credentials.password)
        .subscribe({
          next: (response) => {
            this.toast
              .success(
                'Se requiere autenticacion, hemos enviado un codigo a su correo electronico asociado',
                {
                  position: 'top-right',
                },
              )
              .afterClosed.subscribe({
                next: () => {
                  this.cookieService.set('mfaPending', response.fromTo, {
                    expires: COOKIE_AGE,
                  });
                  this.router.navigate(['auth/account-verification']);
                },
              });
          },
          error: (error) => {
            this.toast.error(error.message, {
              position: 'top-right',
            });
            this.isLoading = false;
          },
        });
    }
  }
}
