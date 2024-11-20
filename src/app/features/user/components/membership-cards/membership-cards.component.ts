import { Component, Input } from '@angular/core';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { PaymentService } from '../../services/payment/payment.service';
import { MessageService } from 'primeng/api';
import { select, Store } from '@ngrx/store';
import { selectUserData } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-membership-cards',
  templateUrl: './membership-cards.component.html',
  styleUrls: ['./membership-cards.component.css']
})
export class MembershipCardsComponent {
@Input() plan!:IMemberShip
userId:string = ''
currentPlan: string | null = null; 
constructor(
  private _paymentService:PaymentService,
  private _store:Store 
){
 this._store.select(selectUserData).subscribe({
  next:(value)=>{
    this.userId = value?._id as string
  },
  error:(err)=>{
    console.error(err)
  }
 })
}
async redirectToCheckOut(planId:string,_id:string) {
  localStorage.setItem('memberShipId',_id)
    await this._paymentService.redirectToCheckout(planId,this.userId)
}

}
