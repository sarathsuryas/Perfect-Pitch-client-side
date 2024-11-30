import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserData } from 'src/app/store/user/user.action';
import { MembershipService } from '../../services/membership/membership.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent  implements AfterViewInit {
  sessionId: string | null = null;
  membershipId:string = ''
  constructor(
    private route: ActivatedRoute,
    private _memberShipService:MembershipService,
    private _router:Router,
    private _store:Store
  ) {
   
  }

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id') as string;
    if(!this.sessionId) {
      this._router.navigate(['home/membership'])
    }
  }

  ngAfterViewInit(): void {
    this.membershipId =  localStorage.getItem('memberShipId') as string
    this.paymentSuccess(this.sessionId as string,this.membershipId)
  }

 

paymentSuccess(sessionId:string,memberShipId:string) {
  this._memberShipService.paymentSuccess(sessionId,memberShipId).subscribe({
    next:(value)=>{
      this._store.dispatch(getUserData())
      this.sessionId = ''
      localStorage.removeItem('memberShipId')
      this._router.navigate(['home/membership'])
    },
    error:(err)=>{
      console.error(err)
    }
   })

}


}
