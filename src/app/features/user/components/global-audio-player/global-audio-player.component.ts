import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Howl } from 'howler';
import { IAudioData } from 'src/app/core/interfaces/IAudioData';
import { selectSongs } from 'src/app/store/song/song.selector';
import { Songs } from 'src/app/store/song/song.state';


@Component({
  selector: 'app-global-audio-player',
  templateUrl: './global-audio-player.component.html',
  styleUrls: ['./global-audio-player.component.css']
})
export class GlobalAudioPlayerComponent {
  sound!: Howl;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  link: string = ''
  index:number = 0
  songs:IAudioData[] = [] 
  constructor(private _store:Store<Songs>) {}

  ngOnInit() {
  

    this._store.select(selectSongs).subscribe({
      next:(value)=>{
         this.link = value.songs[value.index as number].link
         this.songs = value.songs
         this.index = value.index as number
         this.togglePlayPause()
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  loadAudio() {
    this.sound = new Howl({
      src: [this.link],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.duration = this.sound.duration();
        this.trackProgress();
      },
      onend: () => {
        this.isPlaying = false;
      }
    });
  }

  playPrevious() {
    
  }

  playNext() {
    this.index++
    this.link = ''
    this.link = this.songs[this.index].link   
    this.sound.play();
  }

  togglePlayPause() {
    this.loadAudio()
    if (this.isPlaying) {
      this.sound.pause();
      this.isPlaying = false;
    } else {
      this.sound.play();
      this.isPlaying = true;
    }
  }

  onSeek(event: any) {
    const seekTo = event.target.value;
    this.sound.seek(seekTo);
    this.currentTime = seekTo;
  }

  changeVolume(event: any) {
    this.volume = event.target.value;
    this.sound.volume(this.volume);
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }

  trackProgress() {
    setInterval(() => {
      this.currentTime = this.sound.seek() as number;
    }, 1000);
  }

}
