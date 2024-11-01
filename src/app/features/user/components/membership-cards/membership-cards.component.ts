import { Component, Input } from '@angular/core';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { PaymentService } from '../../services/payment/payment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-membership-cards',
  templateUrl: './membership-cards.component.html',
  styleUrls: ['./membership-cards.component.css']
})
export class MembershipCardsComponent {
@Input() plan!:IMemberShip
@Input() userId:string = ''
currentPlan: string | null = null; 
constructor(private _paymentService:PaymentService, 
){
 
}
async redirectToCheckOut(planId:string,_id:string) {
  localStorage.setItem('memberShipId',_id)
    await this._paymentService.redirectToCheckout(planId,this.userId)
}
ngOnChanges() {
  console.log(this.userId)
}
}
