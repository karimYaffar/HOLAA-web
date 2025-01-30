import { Routes } from '@angular/router';
import { DashboardComponent } from './features/public/dashboard/dashboard.component';
import { LoginComponent } from './features/public/login/login.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { DashboardAuthComponent } from './features/auth/dashboard/dashboard.auth.component';
import { LoginAdminComponent } from './features/admin/login/login.component';
import { DashboardAdminComponent } from './features/admin/dashboard/dashboard.component';
import { HomeAdminComponent } from './features/admin/home/home.component';
import { BusinessComponent } from './features/admin/business/business.component';
import { UserComponent } from './features/admin/user/user.component';
import { IncidentsComponent } from './features/admin/incidents/incidents.component';
import { AuditComponent } from './features/admin/audit/audit.component';
import { DocumentComponent } from './features/admin/document/document.component';
import { SocialComponent } from './features/admin/social/social.component';
import { RequestForgotPasswordComponent } from './features/public/request-forgot-password/request-forgot-password.component';
import { ResetPasswordComponent } from './features/public/reset-password/reset-password.component';
import { ProductCardComponent } from './features/public/product-card/product-card.component'; // Importa ProductCardComponent
import { PageNotFoundComponent } from './features/public/page-not-found/page-not-found.component';
import { ContactsComponent } from './features/public/contacts/contacts.component';
import { PageInternalServerErrorComponent } from './features/public/page-internal-server-error/page-internal-server-error.component';
import { errorPageGuard } from './core/guards/error-page.guard';
import { PageBadRequestErrorComponent } from './features/public/page-bad-request-error/page-bad-request-error.component';
import { AboutUsComponent } from './features/public/about-us/about-us.component';
import { PoliciesComponent } from './features/public/policies/policies.component';
import { categoryExistsGuard } from './core/guards/category-exists.guard';
import { AccountActivationComponent } from './features/public/account-activation/account-activation.component';
import { MfaVerificationComponent } from './features/public/mfa-verification/mfa-verification.component';
import { accountPendingGuard } from './core/guards/account-pending.guard';
import { mfaPendingGuard } from './core/guards/mfa-pending.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label: 'Dashboard',
        info: 'icon-[hugeicons--home-11]',
      },
    },
  },
  {
    path: 'productos/:category',
    component: ProductCardComponent,
    canActivate: [categoryExistsGuard],
    data: {
      breadcrumb: {
        label: 'Productos',
        info: 'icon-[hugeicons--dress-03]',
      },
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: {
        label: 'Login',
        info: 'icon-[hugeicons--login-02]',
      },
    },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      breadcrumb: {
        label: 'Registrate',
        info: 'icon-[hugeicons--user]',
      },
    },
  },
  {
    path: 'contactanos',
    component: ContactsComponent,
    data: {
      breadcrumb: {
        label: 'Contactanos',
        info: 'icon-[hugeicons--contact-01]',
      },
    },
  },
  {
    path: 'sobre-nosotros',
    component: AboutUsComponent,
    data: {
      breadcrumb: {
        label: 'Sobre nosotros',
        info: 'icon-[hugeicons--user-group]',
      },
    },
  },
  {
    path: 'politicas',
    component: PoliciesComponent,
    data: {
      breadcrumb: {
        label: 'Politicas',
        info: 'icon-[hugeicons--policy]',
      },
    },
  },

  {
    path: 'account-activation',
    component: AccountActivationComponent,
    canActivate: [accountPendingGuard]
  },
  {
    path: 'account-verification',
    component: MfaVerificationComponent,
    canActivate: [mfaPendingGuard]
  },
  {
    path: 'request-forgot-password',
    component: RequestForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  { path: 'ht/admin/login', component: LoginAdminComponent },

  {
    path: 'admin',
    component: DashboardAdminComponent,
    canActivate: [],
    children: [
      { path: '', component: HomeAdminComponent },
      { path: 'document', component: DocumentComponent },
      { path: 'homeAdmin', component: HomeAdminComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'socials', component: SocialComponent },
      { path: 'user', component: UserComponent },
      { path: 'incidents', component: IncidentsComponent },
      { path: 'audit', component: AuditComponent },
    ],
  },

  {
    path: '500',
    component: PageInternalServerErrorComponent,
  },
  {
    path: '400',
    component: PageBadRequestErrorComponent,
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },

  { path: '**', redirectTo: '404' },
];
