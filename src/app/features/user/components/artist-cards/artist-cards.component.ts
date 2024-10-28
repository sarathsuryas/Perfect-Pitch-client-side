import { Component, Input, OnInit } from '@angular/core';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-cards',
  templateUrl: './artist-cards.component.html',
  styleUrls: ['./artist-cards.component.css']
})
export class ArtistCardsComponent implements OnInit{
@Input() artist!:IUserData
@Input() currentUserId:string = ''
subscribersCount:number = 0
isSubscribed = false
constructor(private _userService:UserService,private _store:Store,private _router:Router) {}
ngOnInit(): void {
  this.subscribersCount = this.artist.subscribers.length
 if(this.artist.subscribers.includes(this.currentUserId as never)) {
    this.isSubscribed = true
 } else {
  this.isSubscribed = false
 }
}
toggleSubscription(artist:IUserData ): void {
  if (this.isSubscribed) {
  this.subscribersCount--
    this.isSubscribed = false
    this._userService.subscribeUser(artist._id).subscribe()
  } else {
    this.isSubscribed = true
    this.subscribersCount++
    this._userService.subscribeUser(artist._id).subscribe()
  }

}

artistMedias() {
  this._router.navigate([`home/artist-medias/${this.artist._id}`])
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
