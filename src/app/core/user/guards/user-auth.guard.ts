import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  map } from 'rxjs';
import { selectIsAuthUser } from 'src/app/store/user/user.selector';

export const UserAuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthUser).pipe(
    map(isAuth=> {
      return isAuth ? true:router.createUrlTree([''])
     })
  )
  
};
