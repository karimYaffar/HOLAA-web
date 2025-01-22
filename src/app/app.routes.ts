import { Routes } from '@angular/router';
import { DashboardComponent } from './features/public/dashboard/dashboard.component';
import { LoginComponent } from './features/public/login/login.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { DashboardAuthComponent } from './features/auth/dashboard/dashboard.auth.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginAdminComponent } from './features/admin/login/login.component';
import { DashboardAdminComponent } from './features/admin/dashboard/dashboard.component';
import { HomeAdminComponent } from './features/admin/home/home.component';
import { BusinessComponent } from './features/admin/business/business.component';
import { UserComponent } from './features/admin/user/user.component';
import { IncidentsComponent } from './features/admin/incidents/incidents.component';
import { AuditComponent } from './features/admin/audit/audit.component';
import { adminGuard } from './core/guards/admin.guard';
import { DocumentComponent } from './features/admin/document/document.component';
import { SocialComponent } from './features/admin/social/social.component';
import { PagenotfoundComponent } from './shared/components/pagenotfound/pagenotfound.component';
import { publicGuard } from './core/guards/public.guard';
import { RequestForgotPasswordComponent } from './features/public/request-forgot-password/request-forgot-password.component';
import { ResetPasswordComponent } from './features/public/reset-password/reset-password.component';
import { VisionMissionComponent } from './shared/components/vision-mission/vision-mission.component';

import { PolicesComponent } from './shared/components/polices/polices.component';
import { ContactsComponent } from './shared/components/contacts/contacts.component';
import { UserVerificationComponent } from './features/public/user-verification/user-verification.component';
import { ProductCardComponent } from './features/public/product-card/product-card.component'; // Importa ProductCardComponent


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'productos/:tipo', component: ProductCardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'auth',
    component: DashboardAuthComponent,
    canActivate: [authGuard],
  },
  {
    path: 'verification',
    component: UserVerificationComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'request-forgot-password',
    component: RequestForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [publicGuard],
  },
  { path: 'ht/admin/login', component: LoginAdminComponent },
  { path: 'vision-mision', component: VisionMissionComponent },
  { path: 'contact-us', component: ContactsComponent },
  { path: 'polices', component: PolicesComponent },

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
  { path: '**', component: PagenotfoundComponent },
];
