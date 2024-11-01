import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { environment } from 'src/environment/environment';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { Store } from '@ngrx/store';
import { setMembershipId } from 'src/app/store/memberShip/membership.action';

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}
interface MembershipPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
}


@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit{
   constructor(private paymentService: PaymentService,private _store:Store) {}
   plans:IMemberShip[] = [];
  
   userId:string = ''
  ngOnInit(): void {
    this.paymentService.getMemberShip().subscribe({
      next:(value)=>{
        this.plans = value.data
        this.userId = value.userId
      },
      error:(err)=>{
        console.log(err)
      }
    }) 
  }





  

  
}






