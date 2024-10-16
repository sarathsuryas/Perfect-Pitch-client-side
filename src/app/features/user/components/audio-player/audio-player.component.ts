import { Component, Input, OnChanges } from '@angular/core';
import { PlaylistDialogComponent } from '../playlist-dialougue/playlist-dialougue.component';
import { MatDialog } from '@angular/material/dialog';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Store } from '@ngrx/store';
import { playSong } from 'src/app/store/song/song.action';

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
export class AudioPlayerComponent implements OnChanges {
 @Input() AlbumDetails!:IAlbumData
 @Input() playlistDetails!:IUserPlaylists 
 @Input() songs:IAudioData[] = []
 songId:string = ''
 horizontalPosition: MatSnackBarHorizontalPosition = 'end';
 verticalPosition: MatSnackBarVerticalPosition = 'bottom';

 constructor(
  private dialog: MatDialog,
  private _userService:UserService,
  private snackBar: MatSnackBar,
  private _store:Store<Song>
 ) {
  
 }

 
 
 currentSongIndex: number = 0;
 isPlaying: boolean = false;
 audio: HTMLAudioElement | null = null;
 currentTime: number = 0;
 duration: number = 0;
 
 ngOnInit() {
   this.audio = new Audio();
   this.audio.addEventListener('ended', () => this.playNext());
   this.audio.addEventListener('timeupdate', () => {
     this.currentTime = this.audio?.currentTime || 0;
   });
   this.audio.addEventListener('loadedmetadata', () => {
     this.duration = this.audio?.duration || 0;
   });
 }

 ngOnChanges(){
  console.log(this.AlbumDetails)
 }
 
 playSong(index: number) {
   if (this.audio) {
     this.currentSongIndex = index;
     this.audio.src = this.songs[index].link;
     this._store.dispatch(playSong({songs:this.songs,index:index}))
    //  this.audio.play();
     this.isPlaying = true;
   }
 }
 
 togglePlayPause() {
 
   if (this.audio) {
     if (this.isPlaying) {
       this.audio.pause();
     } else {
       this.audio.play();
     }
     this.isPlaying = !this.isPlaying;
   }
 }
 
 playNext() {
   this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
   this.playSong(this.currentSongIndex);
 }
 
 playPrevious() {
   this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
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

 
 openPlaylistDialog(song:IAudioData): void {
  const dialogRef = this.dialog.open(PlaylistDialogComponent, {
    width: '350px',
    data:song._id
  });

  dialogRef.afterClosed().subscribe({
    next:(result)=>{
      this._userService.addToPlaylsit(song._id,result._value[0]._id).subscribe({
        next:(data)=>{
           if(data.exist) {
            this.snackBar.open("Song Already in Playlist","Close",{
              duration:3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
           } else if(!data.exist) {
            this.snackBar.open("Song Added to Playlist","Close",{
              duration:3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            })
           }
        }
      })
    },
    error:(err)=>{
      console.error(err)
    }
  });
    // console.log('Selected playlists:', result._value[0]._id,'songId', song._id);
}



}
