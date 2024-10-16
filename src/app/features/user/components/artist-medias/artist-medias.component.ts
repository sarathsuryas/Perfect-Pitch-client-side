import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';

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
  artistName = 'Taylor Swift';
 

  songs: Song[] = [
    { id: 1, title: 'Cardigan', duration: '3:59', albumId: 1 },
    { id: 2, title: 'The 1', duration: '3:30', albumId: 1 },
    { id: 3, title: 'Lover', duration: '3:41', albumId: 2 },
    { id: 4, title: 'Cruel Summer', duration: '2:58', albumId: 2 },
    { id: 5, title: 'Look What You Made Me Do', duration: '3:31', albumId: 3 },
  ];

  videos: Video[] = [
    { id: 1, title: 'Cardigan - Official Music Video', thumbnailUrl: '/placeholder.svg?height=120&width=200', views: 150000000 },
    { id: 2, title: 'Lover - Official Music Video', thumbnailUrl: '/placeholder.svg?height=120&width=200', views: 120000000 },
    { id: 3, title: 'You Need To Calm Down', thumbnailUrl: '/placeholder.svg?height=120&width=200', views: 200000000 },
  ];

  livePerformances: LivePerformance[] = [
    { id: 1, title: 'Reputation Stadium Tour', date: '2018-05-08', venue: 'University of Phoenix Stadium, Glendale, AZ' },
    { id: 2, title: 'City of Lover Concert', date: '2019-09-09', venue: 'LOlympia Bruno Coquatrix, Paris, France' },
    { id: 3, title: 'NPR Tiny Desk Concert', date: '2020-10-16', venue: 'NPR Music' },
  ];

  playlists: Playlist[] = [
    { id: 1, title: 'Taylor Swift Essentials', songCount: 50, coverUrl: '/placeholder.svg?height=200&width=200' },
    { id: 2, title: 'Taylor\'s Version', songCount: 30, coverUrl: '/placeholder.svg?height=200&width=200' },
    { id: 3, title: 'Acoustic Sessions', songCount: 20, coverUrl: '/placeholder.svg?height=200&width=200' },
  ];

  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    this._userService.getAlbums().subscribe({
      next:(value)=>{
        this.albumData = value
      },
      error:(err)=>{
        console.error(err)
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
