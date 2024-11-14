import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ILiveStreams } from 'src/app/core/interfaces/ILiveStreams';
interface MusicVideo {
  id: number;
  title: string;
  artist: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  duration: string;
}
@Component({
  selector: 'app-live-video-cards',
  templateUrl: './live-video-cards.component.html',
  styleUrls: ['./live-video-cards.component.css']
})
export class LiveVideoCardsComponent {
 @Input() video!:ILiveStreams 
 selectedVideo: ILiveStreams | null = null;

 ngOnInit(): void {}

 formatViews(views: number): string {
   return views >= 1000000 ? (views / 1000000).toFixed(1) + 'M' : (views / 1000).toFixed(1) + 'K';
 }

 playVideo(video: ILiveStreams): void {
   this.selectedVideo = video;
 }



}
