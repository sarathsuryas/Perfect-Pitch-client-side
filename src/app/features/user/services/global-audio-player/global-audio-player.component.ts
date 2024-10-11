import { Component, ViewChild } from '@angular/core';
import {Howl, Howler} from 'howler';
import { AudioPlayerService } from '../../services/audio-player.service';
import { PlyrComponent } from '@atom-platform/ngx-plyr';

@Component({
  selector: 'app-global-audio-player',
  templateUrl: './global-audio-player.component.html',
  styleUrls: ['./global-audio-player.component.css']
})
export class GlobalAudioPlayerComponent {

  constructor(private audioService: AudioPlayerService) {}
  @ViewChild(PlyrComponent)
  plyr!: PlyrComponent;
  
  // or get it from plyrInit event
  player!: Plyr;
  
  videoSources: Plyr.Source[] = [
    {
      src: 'https://perfect-pitch-user-profile.s3.ap-south-1.amazonaws.com/_id66f2b6c220a607c219a30f65The_Weeknd_Take_My_Breath_Official_Music_Video__rhTl_OyehF8_137.mp4',
     
    },
  ];
  
  played(event: Plyr.PlyrEvent) {
    console.log('played', event);
  }
  
  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

}
