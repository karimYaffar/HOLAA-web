import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: ':category',
    loadComponent: () =>
      import('./product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
    title: 'Lista de productos',
  },
  {
    path: 'detail',
    loadComponent: () =>
      import(
        './product-detail/product-detail.component'
      ).then((m) => m.ProductDetailComponent),
  },
];
