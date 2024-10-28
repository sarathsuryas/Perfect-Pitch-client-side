import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';


@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: ['./music-playlist.component.css']
})
export class MusicPlaylistComponent implements OnInit {
  playlists: IUserPlaylists[] = []
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
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
