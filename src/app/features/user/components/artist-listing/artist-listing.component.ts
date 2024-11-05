import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { selectSearchQuery } from 'src/app/store/search/search.selector';
import { Store } from '@ngrx/store';

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
search:boolean = false
artistData:IUserData[] = []  
currentUserId:string = ''
  constructor(private _userService:UserService,private _store:Store) { }
  
  ngOnInit(): void {
    this._store.select(selectSearchQuery).subscribe({
      next:(value)=>{
        if(value){
          this.search = true
        }
        this._userService.getArtists(value).subscribe({
          next:(value)=>{
            this.artistData = value.artists
           this.currentUserId = value.userId
          },
          error:(err)=>{
            console.error(err)
          }
        })
       
      }
    })  

  if(!this.search) {
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
}
