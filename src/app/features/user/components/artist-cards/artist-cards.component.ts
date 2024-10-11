import { Component, Input, OnInit } from '@angular/core';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-artist-cards',
  templateUrl: './artist-cards.component.html',
  styleUrls: ['./artist-cards.component.css']
})
export class ArtistCardsComponent implements OnInit{

@Input() artist!:IUserData
@Input() currentUserId:string = ''
likeCount:number = 0
isSubscribed = false
constructor(private _userService:UserService) {}
ngOnInit(): void {
  this.likeCount = this.artist.subscribers.length
 if(this.artist.subscribers.includes(this.currentUserId as never)) {
    this.isSubscribed = true
 } else {
  this.isSubscribed = false
 }
}
toggleSubscription(artist:IUserData ): void {
  if (this.isSubscribed) {
    this.likeCount--
    this.isSubscribed = false
    this._userService.subscribeUser(artist._id).subscribe()
  } else {
    this.isSubscribed = true
    this.likeCount++
    this._userService.subscribeUser(artist._id).subscribe()
  }
  // Here you would typically call a service to update the subscription status on the server
  console.log(`${this.isSubscribed ? 'Subscribed to' : 'Unsubscribed from'} ${artist.fullName}`);
}

formatSubscribers(subscribers: number): string {
  if (subscribers >= 1000000) {
    return (subscribers / 1000000).toFixed(1) + 'M';
  } else if (subscribers >= 1000) {
    return (subscribers / 1000).toFixed(1) + 'K';
  }
  return subscribers.toString();
}  
}
