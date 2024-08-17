import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectIsAuthAdmin } from 'src/app/store/admin/admin.selector';

export const AdminAuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  
  return store.select(selectIsAuthAdmin).pipe(
    map(isAuth=> {
      return isAuth ? true:router.createUrlTree(['/admin'])
    })
  )
};