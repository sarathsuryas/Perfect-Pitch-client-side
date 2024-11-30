import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { Store } from '@ngrx/store';
import { setMembershipId } from 'src/app/store/memberShip/membership.action';
import { MembershipService } from '../../services/membership/membership.service';

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
   constructor(private _memberShipService:MembershipService,private _store:Store) {}
   plans:IMemberShip[] = [];
  
   userId:string = ''
  ngOnInit(): void {
    this._memberShipService.getMemberShip().subscribe({
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






