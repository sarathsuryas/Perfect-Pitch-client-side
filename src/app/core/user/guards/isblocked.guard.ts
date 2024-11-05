import { CanActivateFn } from '@angular/router';

export const isblockedGuard: CanActivateFn = (route, state) => {
   
  return true;
};
