import { Routes } from '@angular/router';
import { DashboardComponent } from './features/public/dashboard/dashboard.component';
import { LoginComponent } from './features/public/login/login.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { DashboardAuthComponent } from './features/auth/dashboard/dashboard.auth.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginAdminComponent } from './features/admin/login/login.component';
import { DashboardAdminComponent } from './features/admin/dashboard/dashboard.component';
import { LogoComponent } from './features/admin/logo/logo.component';
import { PrivacyComponent } from './features/admin/privacy/privacy.component';
import {HomeAdminComponent} from './features/admin/home/home.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'auth/dashboard', component: DashboardAuthComponent, canActivate: [authGuard] },
  { path: 'admin/login', component: LoginAdminComponent },
  {
    path: 'admin',
    component: DashboardAdminComponent,
    children: [
      { path: '', component: HomeAdminComponent }, // Ruta por defecto
      { path: 'logo', component: LogoComponent },
      // Agrega aquí más rutas hijas específicas de la administración
    ]
  },
];
