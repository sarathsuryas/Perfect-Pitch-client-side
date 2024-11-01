import { Component, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { environment } from 'src/environment/environment';
interface Membership {
  name: string;
  price: number;
  interval: string;
  features: string[];
  current: boolean;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  amount: number = 0;

  private stripe: any;
  private elements: any;
  private paymentElement: any;

  constructor(private paymentService: PaymentService) {
  }

showOtherMemberships = false;

memberships: Membership[] = [
  {
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Ad-free music streaming',
      'Offline playback',
      'Unlimited skips'
    ],
    current: true
  },
  {
    name: 'Premium',
    price: 14.99,
    interval: 'month',
    features: [
      'All Basic features',
      'High-quality audio',
      'Lyrics display',
      'Exclusive content'
    ],
    current: false
  },
  {
    name: 'Family',
    price: 19.99,
    interval: 'month',
    features: [
      'All Premium features',
      'Up to 6 accounts',
      'Parental controls',
      'Shared playlists'
    ],
    current: false
  }
];
 
}


 
 


