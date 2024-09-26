import { Component, Input, OnInit } from '@angular/core';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {
   @Input() videos:IVideoList[] = []
   index!:number
   constructor() {
   
   }
   ngOnInit() {
   
  }

}
