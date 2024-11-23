import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ISongsSameGenre } from 'src/app/core/interfaces/ISongsSameGenre';
import { SharedService } from '../../services/shared/shared.service';
import { PlaylistDialogComponent } from '../playlist-dialougue/playlist-dialougue.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent {




id:string = ''  
songs:ISongsSameGenre[] = [];
currentSongIndex: number = 0;
isPlaying: boolean = false;
audio: HTMLAudioElement | null = null;
currentTime: number = 0;
duration: number = 0;
index: number = 0
songId:string = ''
horizontalPosition: MatSnackBarHorizontalPosition = 'end';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';

currentlyPlayingId: string | null = null;
constructor(
  private _userService:UserService,
  private _route:ActivatedRoute,
  private _sharedService:SharedService,
  private _dialog: MatDialog,
  private _snackBar: MatSnackBar, 
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

  onActionMenuClick(_t16: ISongsSameGenre) {

  }
  openPlaylistDialog(songId:string,thumbNailLink:string): void {
    const dialogRef = this._dialog.open(PlaylistDialogComponent, {
      width: '350px',
      data: {
        songId,thumbNailLink
      },
       
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this._userService.addToPlaylsit(songId, result._value[0]._id).subscribe({
          next: (data) => {
            if (data.exist) {
              this._snackBar.open("Song Already in Playlist", "Close", {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              })
            } else if (!data.exist) {
              this._snackBar.open("Song Added to Playlist", "Close", {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              })
            }
          }
        })
      },
      error: (err) => {
        console.error(err)
      }
    });
    // console.log('Selected playlists:', result._value[0]._id,'songId', song._id);
  }



  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

}
