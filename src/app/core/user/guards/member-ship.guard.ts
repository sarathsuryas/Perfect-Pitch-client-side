import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/features/user/services/user/user.service';
import { selectIsPremiumUser } from 'src/app/store/user/user.selector';

export const memberShipGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router)
  const toast = inject(MessageService)
  store.select(selectIsPremiumUser).subscribe({
     next:(value)=>{
    if(!value) {
     // router.navigate(['home/membership'])
      toast.add( {severity: 'warn', 
        summary: 'Warning',
        detail: 'You dont have an active membership',})
    }
    },
    error:(err)=>{
      console.error(err)
    }
  })
  return true;
};
