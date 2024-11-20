import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
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
  selector: 'app-live-videos-listing',
  templateUrl: './live-videos-listing.component.html',
  styleUrls: ['./live-videos-listing.component.css']
})
export class LiveVideosListingComponent implements OnInit {
  selectedVideo: MusicVideo | null = null;
  videos: ILiveStreams[] = [];

  constructor(private _userService: UserService) { }
  ngOnInit(): void {
    this._userService.getStreamings().subscribe({
      next: (value) => {
        this.videos = value
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
