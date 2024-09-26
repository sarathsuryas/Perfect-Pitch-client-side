import { Component, Input } from '@angular/core';
import { Track } from '@khajegan/ngx-audio-player';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent {
  @Input() msaapPlaylist: Track[] = []
  songId!:string
msaapDisplayTitle = true;
msaapDisplayPlayList = true;
msaapPageSizeOptions = [10];
msaapDisplayVolumeControls = true;
msaapDisplayRepeatControls = true;
msaapDisplayArtist = false;
msaapDisplayDuration = false;

msaapDisablePositionSlider = true;


 

  ngOnInit(): void {
  }

  onEnded($event: string) {
    alert('giueh')
    }
}
