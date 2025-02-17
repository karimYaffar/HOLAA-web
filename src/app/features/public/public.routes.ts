import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./home/home.component').then(m => m.HomeComponent),
    title: 'HOLAA Trendy',
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard]
  }
];