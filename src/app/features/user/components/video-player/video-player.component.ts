import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PlyrComponent } from '@atom-platform/ngx-plyr';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
@Input() link:string = ''

}
  

