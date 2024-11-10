import { Routes } from '@angular/router';
import { DashboardComponent } from './features/public/dashboard/dashboard.component';
import { LoginComponent } from './features/public/login/login.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { DashboardAuthComponent } from './features/auth/dashboard/dashboard.auth.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginAdminComponent } from './features/admin/login/login.component';
import { DashboardAdminComponent } from './features/admin/dashboard/dashboard.component';

import { PrivacyComponent } from './features/admin/privacy/privacy.component';
import {HomeAdminComponent} from './features/admin/home/home.component';
import {TermsComponent } from './features/admin/terms/terms.component';
import {DisclaimerComponent} from './features/admin/disclaimer/disclaimer.component'
import { BusinessComponent } from './features/admin/business/business.component';
import { UserComponent } from './features/admin/user/user.component';
import { IncidentsComponent } from './features/admin/incidents/incidents.component';
import { AuditComponent } from './features/admin/audit/audit.component';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'auth', component:DashboardAuthComponent, canActivate: [authGuard] },
  { path: 'admin', component: DashboardAdminComponent, children: [
      { path: '', component: HomeAdminComponent },
      { path: 'login', component: LoginAdminComponent },
      { path: 'privacy', component: PrivacyComponent},
      { path: 'terms', component: TermsComponent},
      { path: 'homeAdmin', component: HomeAdminComponent},
      { path: 'disclaimer' , component: DisclaimerComponent},
      { path: 'business' , component: BusinessComponent},
      { path: 'user' , component: UserComponent},
      { path: 'incidents' , component: IncidentsComponent},
      { path: 'audit' , component: AuditComponent},
    ]
  },
];
