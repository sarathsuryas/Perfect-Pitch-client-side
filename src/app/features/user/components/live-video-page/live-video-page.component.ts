import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
interface LiveStream {
  id: number;
  title: string;
  streamer: string;
  thumbnailUrl: string;
  streamUrl: string;
  viewers: number;
  category: string;
}


@Component({
  selector: 'app-live-video-page',
  templateUrl: './live-video-page.component.html',
  styleUrls: ['./live-video-page.component.css']
})
export class LiveVideoPageComponent {
 
  featuredStream: LiveStream = {
    id: 1,
    title: 'Epic Gaming Marathon',
    streamer: 'ProGamer123',
    thumbnailUrl: 'https://picsum.photos/seed/featured/800/450',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow',
    viewers: 15000,
    category: 'Gaming'
  };

  liveStreams: LiveStream[] = [
    {
      id: 2,
      title: 'Chill Music Session',
      streamer: 'MelodyMaster',
      thumbnailUrl: 'https://picsum.photos/seed/stream1/300/200',
      streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow',
      viewers: 5200,
      category: 'Music'
    },
    {
      id: 3,
      title: 'Cooking Italian Cuisine',
      streamer: 'ChefExtraordinaire',
      thumbnailUrl: 'https://picsum.photos/seed/stream2/300/200',
      streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow',
      viewers: 3800,
      category: 'Cooking'
    },
    {
      id: 4,
      title: 'Late Night Talk Show',
      streamer: 'ComedyKing',
      thumbnailUrl: 'https://picsum.photos/seed/stream3/300/200',
      streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow',
      viewers: 12000,
      category: 'Entertainment'
    },
    {
      id: 5,
      title: 'Fitness Workout Live',
      streamer: 'FitnessFanatic',
      thumbnailUrl: 'https://picsum.photos/seed/stream4/300/200',
      streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow',
      viewers: 2500,
      category: 'Fitness'
    },
    {
      id: 6,
      title: 'Tech News Roundup',
      streamer: 'TechGuru',
      thumbnailUrl: 'https://picsum.photos/seed/stream5/300/200',
      streamUrl: 'https://www.youtube.com/embed/live_stream?channel=UCSJ4gkVC6NrvII8umztf0Ow',
      viewers: 7800,
      category: 'Technology'
    }
  ];

  selectedStream: LiveStream | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  formatViewers(viewers: number): string {
    return viewers >= 1000000 ? (viewers / 1000000).toFixed(1) + 'M' : (viewers / 1000).toFixed(1) + 'K';
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  watchStream(stream: LiveStream): void {
    this.selectedStream = stream;
  }

  closeStream(): void {
    this.selectedStream = null;
  }

}
