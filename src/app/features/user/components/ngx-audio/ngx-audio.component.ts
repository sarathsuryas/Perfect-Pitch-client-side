import { Component, Input } from '@angular/core';
import { Track } from '@khajegan/ngx-audio-player';
import { Store } from '@ngrx/store';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { nextSong, playSong, prevSong, setSongId } from 'src/app/store/song/song.action';
import { selectAlbumId, selectSong } from 'src/app/store/song/song.selector';
import { Songs } from 'src/app/store/song/song.state';
import { UserService } from '../../services/user/user.service';
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
  songs:string[] = [];
  songId:string = ''
  isLiked: boolean = false;
  isVoiceControlActive: boolean = false;
  constructor(private _store: Store<Songs>,private _userService:UserService) { }

   ngOnInit() {
    this.audio = new Audio();
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio?.currentTime || 0;
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio?.duration || 0;
    });
    
   this._store.select(selectSong).subscribe({
    next:(data)=>{
      this.artistName = data.artistName
      this.songId = data.songId
       this._userService.getSong(data.songId).subscribe({
        next:(value)=>{
          this.link = value.link
          this.songThumbnail = value.thumbNailLink
          this.songName = value.title
          this.albumName = value.albumDetails.title
          this.songs = value.albumDetails.songs
          
          this.playSong()
        },
        error:(err)=>{
          console.error(err)
        }
       })
    }
   })
   
    //  needed states ==== song: IAudioData; albumData:IAlbumData;
    // const {songLink,albumLink} = data
    // let album = false
    //if(this.albumLink !== albumLink) {
    // this.albumLink  = albumLink;
    // album = true
    // }
    // if(this.songLink !== songLink) {
    // this.songLink = songLink;
    // getSong({songLink,albumLink,album}) API Call  returns {albumData:IAlbumData,song:IAudioData}
    // }
    // nextButtonFunction() {
    // const songIndex = this.albumData.songs.indexOf(this.song.songLink)
    // const songLink = this.albumData.songs[songIndex+1] || this.albumData.songs[0]
    // getSong({songLink,albumLink:this.albumData.albumLink,album:false})  API Call returns {albumData:null,song:IAudioData};
    // }

    // BACKEND++++++++++++++++++++++++++++


    // const {songLink,albumLink,album} = req.body;
    // if(!songLink || !albumLink || albumLink.length < 16 || songLink.length < 16) return {message:"Poda Myree"};
    // const options:any[] = []
    // options.push({$match:{"songLink":songLink}})
    // if(album) options.push({$lookup:{from:"albums",foreignField:"_id",localField:"albumId",as:album}},{$unwind:albums},group them as well);
    // const data = await audio.aggregate(options);
    // const album = data.album | null
    // const song = data.song
    // 
  }

  playSong(index: number = 0) {
    if (this.audio) {
      this.audio.src = this.link
      this.index = this.songs.findIndex(v=>v === this.songId)
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
    if(this.index < this.songs.length-1) {
      this.index = this.songs.findIndex(v=>v === this.songId)   
      this._store.dispatch(setSongId({songId:this.songs[++this.index]}))
    }
     
  }

  playPrevious() {
    if(this.index > 0) {
      this.index = this.songs.findIndex(v=>v === this.songId)   
      this._store.dispatch(setSongId({songId:this.songs[--this.index]}))
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
