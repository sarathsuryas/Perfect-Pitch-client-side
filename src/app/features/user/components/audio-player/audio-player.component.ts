import {  Component, Input } from '@angular/core';
import { PlaylistDialogComponent } from '../playlist-dialougue/playlist-dialougue.component';
import { MatDialog } from '@angular/material/dialog';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Store } from '@ngrx/store';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';
import { SharedService } from '../../services/shared/shared.service';
import { PlaylistService } from '../../services/playlist/playlist.service';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverUrl: string;
}


@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent {
  @Input() AlbumDetails!: IAlbumDetails
  @Input() playlistDetails!: IUserPlaylists
  @Input() songs: IAudioData[] = []
  songId: string = ''
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  check: boolean = false

  constructor(
    private dialog: MatDialog,
    private _playlistService: PlaylistService,
    private snackBar: MatSnackBar,
    private _store: Store<Song>,
    private _sharedService:SharedService
  ) {
    
  }

  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  audio: HTMLAudioElement | null = null;
  currentTime: number = 0;
  duration: number = 0;
  index: number = 0

  ngOnInit() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio?.currentTime || 0;
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio?.duration || 0;
    });
   this._sharedService.albumSong$.subscribe({
    next:(value)=>{
      this.songId = value.songId
    }
   })
   this._sharedService.playlistSong$.subscribe({
    next:(value)=>{
      this.songId = value.songId
    }
   })

  }



  playSong(index: number) {
    this.currentSongIndex = index;
    this.isPlaying = true;
    this._sharedService.playAlbumSong({albumId:this.AlbumDetails.uuid,songId:this.songs[index].uuid,artistName:this.AlbumDetails.artistDetails.fullName,album:true,isGenre:false})
    this._sharedService.changePlayerState(true)
   
  }

playlistPlay(index:number) {
  this.currentSongIndex = index;
  this.isPlaying = true;
  const array = []
  for(const value of this.songs) {
     array.push(value.uuid)
  }
  this._sharedService.changePlayerState(true)
  this._sharedService.playPlaylistSong({playlistId:this.playlistDetails.uuid,songId:this.songs[index].uuid,artistName:this.songs[index].artistId.fullName,songs:array,album:false,isGenre:false})
}
 
  playNext() {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    this.playSong(this.currentSongIndex);
  }

  
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  onSeek(event: Event) {
    const seekTime = +(event.target as HTMLInputElement).value;
    if (this.audio) {
      this.audio.currentTime = seekTime;
    }
  }


  openPlaylistDialog(songId:string,thumbNailLink:string): void {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      width: '350px',
      data: {
        songId,thumbNailLink
      },
       
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        this._playlistService.addToPlaylsit(songId, result._value[0]._id).subscribe({
          next: (data) => {
            if (data.exist) {
              this.snackBar.open("Song Already in Playlist", "Close", {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              })
            } else if (!data.exist) {
              this.snackBar.open("Song Added to Playlist", "Close", {
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



}
