import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css']
})
export class ViewPlaylistComponent implements OnInit {
  id:string = ''
  playlistDetails!:IUserPlaylists
  constructor(private _userService:UserService,private _route:ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id') as string
   this._userService.getPlaylistSongs(this.id).subscribe({
    next:(value)=>{
     this.playlistDetails = value
    }
   })
  }

}
