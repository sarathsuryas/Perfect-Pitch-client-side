import { Component, Input } from '@angular/core';
import { Track } from '@khajegan/ngx-audio-player';
import { Store } from '@ngrx/store';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { nextSong, playAlbumSong, prevSong, setAlbumSongId } from 'src/app/store/album/album.action';
import { selectAlbumId, selectAlbumSong } from 'src/app/store/album/album.selector';
import { UserService } from '../../services/user/user.service';
import { selectPlaylistSong } from 'src/app/store/playlist/playlist.selector';
import { setPlaylistSongId } from 'src/app/store/playlist/playlist.action';
@Component({
  selector: 'app-ngx-audio',
  templateUrl: './ngx-audio.component.html',
  styleUrls: ['./ngx-audio.component.css']
})
export class NgxAudioComponent {
  songName: string = 'Unknown Song';
  artistName: string = 'Unknown Artist';
  albumName: string = 'Unknown Album';
  songThumbnail: string = '/placeholder.svg?height=64&width=64';
  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  audio: HTMLAudioElement | null = null;
  currentTime: number = 0;
  duration: number = 0;
  link: string = '';
  index: number = 0;
  songs: string[] = [];
  songId: string = ''
  isLiked: boolean = false;
  isAlbum: boolean = false
  isVoiceControlActive: boolean = false;
  constructor(private _store: Store, private _userService: UserService) { }

  ngOnInit() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio?.currentTime || 0;
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio?.duration || 0;
    });

    this._store.select(selectAlbumSong).subscribe({
      next: (data) => {
        this.songId = data.songId as string
        this.isAlbum = data.album
       
        if (this.isAlbum) {
          this._userService.getSong(data.songId as string).subscribe({
            next: (value) => {
              this.link = value.link
              this.songThumbnail = value.thumbNailLink
              this.songName = value.title
              this.albumName = value.albumDetails.title
              this.songs = value.albumDetails.songs
              this.artistName = value.artistDetails.fullName
              this.playSong()
            },
            error: (err) => {
              console.error(err)
            }
          })
        }
      }
    })

    if (!this.isAlbum) {
      this._store.select(selectPlaylistSong).subscribe({
        next: (data) => {
          this.isAlbum = data.album
          this.songId = data.songId as string
          this.songs = data.songs
           
          this._userService.getSong(data.songId as string)
            .subscribe({
              next: (value) => {
                this.link = value.link
                this.songThumbnail = value.thumbNailLink
                this.songName = value.title
                this.albumName = value.albumDetails.title
                this.artistName = value.artistDetails.fullName
                this.playSong()
              },
              error: (err) => {
                console.error(err)
              }
            })
        }
      })
    }
  }

  playSong(index: number = 0) {
    if (this.audio) {
      this.audio.src = this.link
      this.index = this.songs.findIndex(v => v === this.songId)
      this.audio.play();
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
    if (this.index < this.songs.length - 1 && this.isAlbum) {
      console.log(this.songs,'from the next')
      this.index = this.songs.findIndex(v => v === this.songId)
      this._store.dispatch(setAlbumSongId({ songId: this.songs[++this.index],album:true}))
    }
  
    if (this.index < this.songs.length - 1 && !this.isAlbum) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._store.dispatch(setPlaylistSongId({ songId: this.songs[++this.index],album:false,songs:this.songs}))

    }

  }

  playPrevious() {
    if (this.index > 0 && this.isAlbum) {
      console.log(this.songs,'from the prev')
      this.index = this.songs.findIndex(v => v === this.songId)
      this._store.dispatch(setAlbumSongId({ songId: this.songs[--this.index],album:true }))
    }
    if (this.index > 0 && !this.isAlbum) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._store.dispatch(setPlaylistSongId({ songId: this.songs[--this.index],album:false ,songs:this.songs}))
    }
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    console.log(this.isLiked ? 'Song liked' : 'Song unliked');
  }
  toggleVoiceControl() {
    this.isVoiceControlActive = !this.isVoiceControlActive;
    console.log(this.isVoiceControlActive ? 'Voice control activated' : 'Voice control deactivated');
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

}
