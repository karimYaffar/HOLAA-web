import { Routes } from '@angular/router';
import { DashboardComponent } from './features/public/dashboard/dashboard.component';
import { LoginComponent } from './features/public/login/login.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { DashboardAuthComponent } from './features/auth/dashboard/dashboard.auth.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'auth/dashboard', component: DashboardAuthComponent, canActivate: [authGuard]}
];
