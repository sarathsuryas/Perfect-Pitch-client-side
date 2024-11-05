import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { IAlbumResponse } from 'src/app/core/interfaces/IAlbumResponse';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';

@Component({
  selector: 'app-album-songs-list',
  templateUrl: './album-songs-list.component.html',
  styleUrls: ['./album-songs-list.component.css']
})
export class AlbumSongsListComponent {
  albumData$!:Observable<IAlbumResponse> 
  id!: string 
  songs:IAudioData[] = []
  albumData!:IAlbumDetails 
  constructor(private _userService:UserService,private route: ActivatedRoute,private dialog: MatDialog) {
    this.id = this.route.snapshot.paramMap.get('id') as string
     this.albumData$ = this._userService.getAlbumDetails(this.id)
     this.albumData$.subscribe((data)=>{
      this.albumData = data
      this.songs = data.songs
    })
  }

  


}
