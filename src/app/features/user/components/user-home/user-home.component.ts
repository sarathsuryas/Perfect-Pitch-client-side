import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/store/user/user.selector';
import { RecommendedService } from '../../services/recommended/recommended.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  public albums: IAlbumData[] = []
  public artists: IUserData[] = []
  public videos: IVideoList[] = []
  public playlists: IUserPlaylists[] = []
  public userId:string = ''
  constructor(private _userService: UserService,private _store:Store,private _recommendedService:RecommendedService) {
  }
  ngOnInit() {
    this._store.select(selectUserData).subscribe({
      next:(value)=>{
        this.userId = value?._id as string
      }
    })
    this._recommendedService.recomended().subscribe({
      next: (data) => {
        this.albums = data.albums
        this.artists = data.artists
        this.videos = data.videos
        this.playlists = data.playlists

      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
