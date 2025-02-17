import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'account-activation',
    loadComponent: () =>
      import('./account-activation/account-activation.component').then(
        (m) => m.AccountActivationComponent,
      ),
  },
  {
    path: 'account-verification',
    loadComponent: () =>
      import('./mfa-verification/mfa-verification.component').then(
        (m) => m.MfaVerificationComponent,
      ),
  },
  {
    path: 'request-forgot-password',
    loadComponent: () =>
      import(
        './request-forgot-password/request-forgot-password.component'
      ).then((m) => m.RequestForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent,
      ),
  },
];
