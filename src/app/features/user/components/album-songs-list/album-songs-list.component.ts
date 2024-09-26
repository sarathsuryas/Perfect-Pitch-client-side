import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';
import { Track } from '@khajegan/ngx-audio-player';

@Component({
  selector: 'app-album-songs-list',
  templateUrl: './album-songs-list.component.html',
  styleUrls: ['./album-songs-list.component.css']
})
export class AlbumSongsListComponent {
  albumData$!:Observable<IAlbumDetails> 
  id!: string 
  msaapPlaylist: Track[] = []
  albumData:IAlbumDetails = {title:'',artistName:'',thumbNailLink:'',songs:[{title:'',link:'',artistName:''}]}
  constructor(private _userService:UserService,private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') as string
     this.albumData$ = this._userService.getAlbumDetails(this.id)
     this.albumData$.subscribe((data)=>{
      this.albumData = data
       this.msaapPlaylist = data.songs
    })
  }

}
