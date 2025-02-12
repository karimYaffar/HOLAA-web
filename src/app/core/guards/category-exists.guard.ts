import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CategoryService } from '../providers/category.service';

export const categoryExistsGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const categoryService = inject(CategoryService);

  const categoryName = route.paramMap.get('category');

  return categoryService.getCategories().pipe(
    map((categories) => {
      const isValidCategory = categories.some(category => category.name.toLowerCase() === categoryName?.toLowerCase())

      if (isValidCategory) {
        return true;
      } else {
        return router.createUrlTree(['/400']);
      }

     }),
     catchError((err) => {
      return of(router.createUrlTree(['/400']));
     })
  )
  
};

