import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectAdminToken } from 'src/app/store/admin/admin.selector';

export const adminGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  
  return store.select(selectAdminToken).pipe(
    map(isAuth=> {
      return isAuth ? true:router.createUrlTree(['/admin'])
    })
  )
 
};
