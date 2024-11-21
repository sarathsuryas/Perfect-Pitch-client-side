import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from 'src/app/store/search/search.selector';


@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: ['./music-playlist.component.css']
})
export class MusicPlaylistComponent implements OnInit {
  playlists: IUserPlaylists[] = []
  search:boolean = false

  constructor(private _userService: UserService,private _store:Store) { }

  ngOnInit(): void {
    this._store.select(selectSearchQuery).subscribe({
      next:(value)=>{
        if(value){
          this.search = true
        }
        if(this.search) {
          this._userService.getUserPlalists({query:value}).subscribe((data)=>{
            this.playlists = data
          })
        }
      }
    })  
    if(!this.search) {
      this._userService.getUserPlalists().subscribe({
        next: (data) => {
           this.playlists = data
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
  }

  loadMore() {
    const nextPage = Math.ceil(this.playlists.length / 10) + 1; 
    this._userService.getUserPlalists({nextPage}).subscribe((data) => {
      for (const value of data) {
        this.playlists.push(value)
      }
    })
  }

}
