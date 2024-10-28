import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
interface Playlist {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  songCount: number;
  totalDuration: string;
}

@Component({
  selector: 'playlist-cards',
  templateUrl: './playlist-cards.component.html',
  styleUrls: ['./playlist-cards.component.css']
})
export class PlaylistCardsComponent {

  @Input() playlists:IUserPlaylists[] = []

  constructor(
    private _userService: UserService,
    private _router:Router
  ) { }


  playlist: Playlist[] = [
    {
      id: 1,
      title: 'My Favorite Mix',
      description: 'A mix of all my favorite songs',
      thumbnailUrl: '/placeholder.svg?height=120&width=120',
      songCount: 50,
      totalDuration: '3h 25min'
    },

  ];


  ngOnInit(): void {

  }

  onPlaylistClick(playlist: IUserPlaylists): void {
    console.log(`Playlist clicked: ${playlist.title}`);
    
    this._router.navigate([`home/view-playlist/${playlist._id}`])
    
  }


}
