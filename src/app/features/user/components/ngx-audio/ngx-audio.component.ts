import { Component, ElementRef, Input } from '@angular/core';
import { Track } from '@khajegan/ngx-audio-player';
import { Store } from '@ngrx/store';
import { UserService } from '../../services/user/user.service';
import { SharedService } from '../../services/shared/shared.service';
import { AudioService } from '../../services/audio/audio.service';
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
  isVoiceControlActive: boolean = false ;
  private isGenre: boolean = false
  player:boolean = false
  constructor(private _store: Store, private _audioService:AudioService, private _sharedService: SharedService) { }

  ngOnInit() {
    this.audio = new Audio() as HTMLAudioElement;
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio?.currentTime || 0;
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio?.duration || 0;
    });
    


    this._sharedService.albumSong$.subscribe({
      next: (data) => {
        this.songId = data.songId as string
        this.isAlbum = data.album
        this.isGenre = data.isGenre
        if (this.isAlbum && this.songId.length && !this.isGenre) {
          this._audioService.getSong(data.songId as string).subscribe({
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


    
      this._sharedService.playlistSong$.subscribe({
        next: (data) => {
          this.isAlbum = data.album
          this.songId = data.songId as string
          this.songs = data.songs
          this.isAlbum = data.album
          this.isGenre = data.isGenre
          if (this.songId && !this.isAlbum && !this.isGenre) {
            this._audioService.getSong(data.songId as string)
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

        }
      })
    


    this._sharedService.genreSong$.subscribe({
      next: (data) => {
        this.songId = data.songId
        this.isAlbum = data.album
        this.isGenre = data.genre
        if (this.songId.length && !this.isAlbum && this.isGenre) {
          this._audioService.getSong(data.songId as string).subscribe({
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
    if (this.index < this.songs.length - 1 && this.isAlbum && !this.isGenre) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._sharedService.playAlbumSong({ songId: this.songs[++this.index], album: true, isGenre: false })
    }

    if (this.index < this.songs.length - 1 && !this.isAlbum && !this.isGenre) {

      this.index = this.songs.findIndex(v => v === this.songId)
      this._sharedService.playPlaylistSong({ songId: this.songs[++this.index], album: false, songs: this.songs,isGenre:false })

    }
    if (this.index < this.songs.length - 1 && this.isGenre && !this.isAlbum) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._sharedService.playGenreSong({ songId: this.songs[++this.index], album: false, genre: true })
    }


  } 

  playPrevious() {
    if (this.index > 0 && this.isAlbum) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._sharedService.playAlbumSong({ songId: this.songs[--this.index], album: true, isGenre: false })

    }
    if (this.index > 0 && !this.isAlbum && !this.isGenre) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._sharedService.playPlaylistSong({ songId: this.songs[--this.index], album: false, songs: this.songs,isGenre:false })
    }
    if (this.index > 0 && !this.isAlbum && this.isGenre) {
      this.index = this.songs.findIndex(v => v === this.songId)
      this._sharedService.playGenreSong({ songId: this.songs[--this.index], album: false, genre: true })

    }
  }


 toggleVoiceControl() {
  this.isVoiceControlActive = !this.isVoiceControlActive;

  if (this.audio) {
    this.audio.muted = this.isVoiceControlActive;
    console.log(this.isVoiceControlActive ? 'Audio muted' : 'Audio unmuted');
  }
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

  closePlayer() {
    this._sharedService.changePlayerState(false)
  }
  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause()
      this.audio.src = ''
      this.audio.load()
      this.audio = null
    }
  }

}
