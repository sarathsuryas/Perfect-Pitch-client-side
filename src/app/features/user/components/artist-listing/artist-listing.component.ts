import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserData } from 'src/app/core/interfaces/IUserData';

interface Artist {
  id: number;
  name: string;
  imageUrl: string;
  genre: string;
  subscribers: number;
  isSubscribed: boolean;
}

@Component({
  selector: 'app-artist-listing',
  templateUrl: './artist-listing.component.html',
  styleUrls: ['./artist-listing.component.css']
})
export class ArtistListingComponent {

artistData:IUserData[] = []  
currentUserId:string = ''
  constructor(private _userService:UserService) { }
  
  ngOnInit(): void {
    this._userService.getArtists().subscribe({
      next:(value)=>{
        this.artistData = value.artists
       this.currentUserId = value.userId
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  
 
}
