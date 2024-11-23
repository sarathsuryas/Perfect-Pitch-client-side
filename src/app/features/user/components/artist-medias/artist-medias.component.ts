import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { ActivatedRoute } from '@angular/router';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';

interface Album {
  id: number;
  title: string;
  year: number;
  coverUrl: string;
}

interface Song {
  id: number;
  title: string;
  duration: string;
  albumId: number;
}

interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  views: number;
}

interface LivePerformance {
  id: number;
  title: string;
  date: string;
  venue: string;
}

interface Playlist {
  id: number;
  title: string;
  songCount: number;
  coverUrl: string;
}


@Component({
  selector: 'app-artist-medias',
  templateUrl: './artist-medias.component.html',
  styleUrls: ['./artist-medias.component.css']
})
export class ArtistMediasComponent {

  albumData:IAlbumData[] = []
  artistName = '';
  artistId:string = ''
  videos: IVideoList[] = []
  playlists:IUserPlaylists[] = []

  loadMore() {
    
  }
  
 

  

  constructor(private _userService:UserService,private _activatedRoute: ActivatedRoute) {
    this.artistId = this._activatedRoute.snapshot.params['id'];

   }

  ngOnInit(): void {
    this._userService.getArtistMedia(this.artistId).subscribe({
      next:(value)=>{
        this.videos = value.videos
        this.playlists = value.playlists
        this.albumData = value.albums
        this.artistName = value.videos[0].artistData.fullName
      }
    })

  }

  formatViews(views: number): string {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  }




}
