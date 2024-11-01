import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Stripe} from '@stripe/stripe-js'
import { MessageService } from 'primeng/api';
import { firstValueFrom, Observable } from 'rxjs';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
stripePromise:Promise<Stripe>
memberShipId:string = ''
api = `${environment.apiUrl}/users`
constructor(private _http:HttpClient,private readonly _messageService: MessageService) {
  this.stripePromise = this.loadStripe()
}
private loadStripe():Promise<Stripe> {
return (window as any).Stripe(environment.stripe.publicKey)
}
async redirectToCheckout(priceId:string,userId:string) {
   const checkMemberShip = this._http.post(`${this.api}/check-active-membership`,{userId})
   const active = await firstValueFrom(checkMemberShip)
   if(active) {
    this._messageService.add({
      severity: 'warn', 
      summary: 'Warning',
      detail: 'You have an active membership',
    });
    return;
   }
  const stripe = await this.stripePromise
  const response =  this._http.post(`${this.api}/create-checkout-session`,{priceId})
  const sessionId = await firstValueFrom(response)

  const result = await stripe.redirectToCheckout({
    sessionId:sessionId.toString(),
  })
  if(result.error) {
    console.error(result.error)
  }
}

paymentSuccess(sessionId:string,memberShipId:string) {
 return this._http.post(`${this.api}/payment-success`,{sessionId,memberShipId})
}

getMemberShip():Observable<{data:IMemberShip[],userId:string}> {
  return this._http.get<{data:IMemberShip[],userId:string}>(`${this.api}/get-membership`)
}
 
}
