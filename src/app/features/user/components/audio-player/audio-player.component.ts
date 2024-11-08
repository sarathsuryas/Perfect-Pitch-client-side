import {  Component, Input } from '@angular/core';
import { PlaylistDialogComponent } from '../playlist-dialougue/playlist-dialougue.component';
import { MatDialog } from '@angular/material/dialog';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Store } from '@ngrx/store';
import { playAlbumSong } from 'src/app/store/album/album.action';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';
import { selectAlbumSongId } from 'src/app/store/album/album.selector';
import { playPlaylistSong } from 'src/app/store/playlist/playlist.action';

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
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private _store: Store<Song>
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
    this._store.select(selectAlbumSongId).subscribe({
      next: (songId) => {
        this.songId = songId as string
      },
      error: (err) => {
        console.error(err)
      }
    })
  }



  playSong(index: number) {
    this.currentSongIndex = index;
    this.isPlaying = true;
    this._store.dispatch(playAlbumSong({albumId:this.AlbumDetails.uuid,songId:this.songs[index].uuid,artistName:this.AlbumDetails.artistDetails.fullName,album:true}))
  }

playlistPlay(index:number) {
  this.currentSongIndex = index;
  this.isPlaying = true;
  const array = []
  for(const value of this.songs) {
     array.push(value.uuid)
  }
  this._store.dispatch(playPlaylistSong({playlistId:this.playlistDetails.uuid,songId:this.songs[index].uuid,artistName:this.songs[index].artistId.fullName,songs:array,album:false}))
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
        this._userService.addToPlaylsit(songId, result._value[0]._id).subscribe({
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
