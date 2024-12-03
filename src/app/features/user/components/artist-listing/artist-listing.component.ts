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
isLoading=false;
currentPage=1;
itemsPerPage=8;
toggleLoading = ()=>this.isLoading=!this.isLoading;

  constructor(private _userService:UserService,private _store:Store) { }
  
  ngOnInit(): void {
    this.loadData() 
    this._store.select(selectSearchQuery).subscribe({
      next:(value)=>{
        if(value){
          this.search = true
        }
        if(this.search) {
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
    })  

  }
  
  loadData() {
    this._userService.getArtists().subscribe((data) => {
       this.artistData = data.artists
    })
  }

  appendData(){
    this.toggleLoading();
    this._userService.getArtists(this.currentPage,this.itemsPerPage).subscribe({
     next:response=>this.artistData = [...this.artistData,...response.artists],
     error:err=>console.log(err),
     complete:()=>this.toggleLoading()
    })
  }  
  onScroll () {
    this.currentPage++;
    this.appendData();
   }


}
