import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { ActivatedRoute, Router } from '@angular/router';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';



@Component({
  selector: 'app-artist-medias',
  templateUrl: './artist-medias.component.html',
  styleUrls: ['./artist-medias.component.css']
})
export class ArtistMediasComponent {
  

  albumData: IAlbumData[] = []
  artistName = '';
  artistId: string = ''
  videos: IVideoList[] = []
  playlists: IUserPlaylists[] = []

  constructor(private _userService: UserService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.artistId = this._activatedRoute.snapshot.params['id'];

  }
  loadMoreAlbums() {
    this._router.navigate([`home/more-albums/${this.artistId}`])
  }
  loadMoreVideos() {
    this._router.navigate([`home/more-videos/${this.artistId}`])

  }
  loadMorePlaylists() {
    this._router.navigate([`home/more-playlists/${this.artistId}`])
  }




  ngOnInit(): void {
    this._userService.getArtistMedia(this.artistId).subscribe({
      next: (value) => {
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
