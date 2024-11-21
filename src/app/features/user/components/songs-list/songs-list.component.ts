import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ISongsSameGenre } from 'src/app/core/interfaces/ISongsSameGenre';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent {
performAction1() {
throw new Error('Method not implemented.');
}
onActionMenuClick(_t16: ISongsSameGenre) {
throw new Error('Method not implemented.');
}
openPlaylistDialog(arg0: string,arg1: string) {
throw new Error('Method not implemented.');
}

id:string = ''  
songs:ISongsSameGenre[] = [];
currentSongIndex: number = 0;
isPlaying: boolean = false;
audio: HTMLAudioElement | null = null;
currentTime: number = 0;
duration: number = 0;
index: number = 0
songId:string = ''


currentlyPlayingId: string | null = null;
constructor(
  private _userService:UserService,
  private _route:ActivatedRoute,
  private _sharedService:SharedService 
) {
  
}
  
ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id') as string
    this._userService.getSameGenreSongs(this.id).subscribe({
      next:(value)=>{
      this.songs = value
      },
      error:(err)=>{
         console.error(err)
      }
    })
    this._sharedService.genreSong$.subscribe({
      next:(value)=>{
        this.songId = value.songId
      }
    })
  }

  playSong(index: number): void {
    this.currentSongIndex = index;
    this.isPlaying = true;
    this._sharedService.playGenreSong({genreId:this.songs[0].genreId,songId:this.songs[index].uuid,album:false, genre:true})
    this._sharedService.changePlayerState(true)
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

}
