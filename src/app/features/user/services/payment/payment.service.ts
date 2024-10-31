import { Injectable } from '@angular/core';
import {Stripe} from '@stripe/stripe-js'
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
stripePromise:Promise<Stripe>
constructor() {
  this.stripePromise = this.loadStripe()
}
private loadStripe():Promise<Stripe> {
return (window as any).Stripe(environment.stripe.publicKey)
}
async redirectToCheckout(data:any) {
  const stripe = await this.stripePromise
  const response = await fetch(`${environment.apiUrl}/users/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({priceId:data}),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
 
  const sessionId = await response.json();
  const result = await stripe.redirectToCheckout({
    sessionId:sessionId
  })
  if(result.error) {
    console.error(result.error)
  }
}


}
