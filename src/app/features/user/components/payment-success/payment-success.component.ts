import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
import { Store } from '@ngrx/store';

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
    private _paymentService:PaymentService,
    private _router:Router,
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
  this._paymentService.paymentSuccess(sessionId,memberShipId).subscribe({
    next:(value)=>{
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
