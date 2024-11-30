import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IVideoDetails } from 'src/app/core/interfaces/IVideoDetails';
import { UserService } from '../../services/user/user.service';
import { ICurrentUser } from 'src/app/core/interfaces/ICurrentUser';
import { IVideoCommentDto } from 'src/app/core/dtos/IVideoComment.dto';
import { VideoService } from '../../services/video/video.service';
import { CommentsService } from '../../services/comments/comments.service';



@Component({
  selector: 'app-shorts-player',
  templateUrl: './shorts-player.component.html',
  styleUrls: ['./shorts-player.component.css']
})
export class ShortsPlayerComponent implements OnInit, OnChanges {
  @Input() videoShorts: IVideoDetails[] = []
  @Input() currentUser!: ICurrentUser
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  videoUrl: string = ''
  likeCount: number = 0
  liked: boolean = false
  currentVideoIndex = 0;
  isPlaying = false;
  isSubscribed!: boolean;

  constructor(private readonly _videoService:VideoService,private _userService:UserService,private _commentService:CommentsService) { }

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.play();
    this.likeCount = this.videoShorts[this.currentVideoIndex].like.length
    this.isPlaying = true;
  }

  ngOnInit() {
    // const video = this.videoPlayer.nativeElement;
    // video.play();
    // this.isPlaying = true;
    // setTimeout(() => this.playVideo(), 0);
  }
  ngOnChanges(): void {
    if (this.videoShorts[this.currentVideoIndex].like.includes(this.currentUser._id as never)) {
      this.liked = true
    } else {
      this.liked = false
    }
    if (this.videoShorts[this.currentVideoIndex].artistId.subscribers.includes(this.currentUser._id as never)) {

      this.isSubscribed = true
    } else {
      this.isSubscribed = false
    }

  }


  playVideo() {
    const video = this.videoPlayer.nativeElement;
    video.play();
    this.isPlaying = true;
  }

  pauseVideo() {
    const video = this.videoPlayer.nativeElement;
    video.pause();
    this.isPlaying = false;
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseVideo();
    } else {
      this.playVideo();
    }
  }

  nextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoShorts.length;
    this.likeCount = this.videoShorts[this.currentVideoIndex].like.length
    if (this.videoShorts[this.currentVideoIndex].like.includes(this.currentUser._id as never)) {
      this.liked = true
    } else {
      this.liked = false
    }
    if (this.videoShorts[this.currentVideoIndex].artistId.subscribers.includes(this.currentUser._id as never)) {
      this.isSubscribed = true
    } else {
      this.isSubscribed = false
    }

    this.playVideo();
  }

  previousVideo() {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videoShorts.length) % this.videoShorts.length;
    if (this.videoShorts[this.currentVideoIndex].like.includes(this.currentUser._id as never)) {
      this.liked = true
    } else {
      this.liked = false
    }

    if (this.videoShorts[this.currentVideoIndex].artistId.subscribers.includes(this.currentUser._id as never)) {
      this.isSubscribed = true
    } else {
      this.isSubscribed = false
    }
    this.playVideo();
  }

  likeVideo() {
    if (this.liked) {
      this.likeCount--
      this.liked = false
      const videoId = this.videoShorts[this.currentVideoIndex]._id
      this._videoService.likeVideo(videoId).subscribe()
    } else {
      const videoId = this.videoShorts[this.currentVideoIndex]._id
      this._videoService.likeVideo(videoId).subscribe()
      this.likeCount++
      this.liked = true
    }
  }

  addComment(comment: string) {
    const obj: IVideoCommentDto = {
      videoId: this.videoShorts[this.currentVideoIndex]._id,
      comment: comment,
    }
    this._commentService.commentVideo(obj).subscribe((data) => {

    })
  }

  toggleSubscribe() {
    this.isSubscribed = !this.isSubscribed;
    const artistId = this.videoShorts[this.currentVideoIndex].artistId._id
    this._userService.subscribeUser(artistId).subscribe()
  }

  shareVideo() {
    // Implement share functionality
    console.log('Sharing video:', this.videoShorts[this.currentVideoIndex].title);
  }

  showComments() {
    // Implement comments functionality
    console.log('Showing comments for:', this.videoShorts[this.currentVideoIndex].title);
  }
}
