import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IVideoDetails } from 'src/app/core/interfaces/IVideoDetails';
import { Store } from '@ngrx/store';
import { IVideoCommentDto } from 'src/app/core/dtos/IVideoComment.dto';
import { ICommentDetails } from 'src/app/core/interfaces/ICommentDetails';
import { ISuggestionCommentResponse } from 'src/app/core/interfaces/ISuggestionCommentResponse';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { IResponseVideo } from 'src/app/core/interfaces/IResponseVideo';



@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css']
})
export class VideoPlayComponent implements OnInit {

  @ViewChild('title') title!: ElementRef;
  @ViewChild('artist') artist!: ElementRef;
  @ViewChild('description') description!: ElementRef;

  id!: string
  videoData!: IVideoDetails
  videoSuggestions: IVideoDetails[] = []
  link: string = ''
  source!: string
  currentVideo!: IVideoDetails
  likeCount: number = 0;
  likeCountInitial!: number;
  likeCountArray: [] = []
  like!: boolean
  userId: string = ''
  artistId: string = ''
  isSubscribed!: boolean;
  artistImage!: string;
  userImage: string = ''
  userName: string = ''
  currentVideoId: string = ''
  comments:ICommentResponse[] = []
  suggestedVideoComments:ISuggestionCommentResponse[] = []
  suggestComments:any[] = []
  commentId:string = ''
  newLikeCommentId:string = ''

  constructor(private _userService: UserService, private route: ActivatedRoute, private _store: Store) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string
    this._userService.getVideoDetails(this.id).subscribe((data) => {
    
      this.videoData = data.video
      this.currentVideoId = data.video._id
      this.videoSuggestions = data.suggestions
      this.likeCountInitial = data.video.like.length
      this.likeCount = data.video.like.length
      this.currentVideo = data.video
      this.artistImage = data.video.artistId.profileImage
      this.userId = data.userId
      this.title.nativeElement.innerHTML = data.video.title
      this.artist.nativeElement.innerHTML = data.video.artist
      this.description.nativeElement.innerHTML = data.video.description
      const uId = this.userId
      this.userImage = data.profileImage
      this.userName = data.userName
      /// artist Id means the user who posted the content
     this.suggestedVideoComments = data.suggestedVideoComments
      this.artistId = data.userId
      this.comments = data.comments
      
      // this.suggestedVideoComments =  data.suggestedVideoComments
      if (data.video.like.includes(uId as never)) {
        this.like = true
      } else {
        this.like = false
      }
      if (data.video.artistId.subscribers.includes(this.userId as never)) {
        this.isSubscribed = true
      } else {
        this.isSubscribed = false
      }
    })
  }


  currentIndex = 0;

  

  onClickPlaylistVideo(item: IVideoDetails, index: number) {
    this.currentIndex = index;
    this.currentVideo = item
    this.currentVideoId = this.currentVideo._id
    this.likeCount = this.currentVideo.like.length
    this.title.nativeElement.innerHTML = this.currentVideo.title
    this.artist.nativeElement.innerHTML = this.currentVideo.artist
    this.description.nativeElement.innerHTML = this.currentVideo.description
    this.artistImage = this.currentVideo.artistId.profileImage
    for(const value of this.suggestedVideoComments) {
       this.suggestComments.push(value)
    }
    // this.comments = this.suggestedVideoComments[0] 
      this.comments =  this.suggestComments[index]
    /// artist Id means the user who posted the content
    this.artistId = this.currentVideo.artistId._id
    if (this.currentVideo.like.includes(this.userId as never)) {
      this.like = true
    } else {
      this.like = false
    }
    if (this.currentVideo.artistId.subscribers.includes(this.userId as never)) {
      this.isSubscribed = true
    } else {
      this.isSubscribed = false
    }


  }

  toggle() {
    if (this.like) {
      const data = this.videoSuggestions[this.currentIndex] as IVideoDetails
      this.likeCount--
      this.like = false
      const index = this.currentVideo.like.findIndex((v) => v === this.userId)
      this.currentVideo.like.splice(index, 1)
      this._userService.likeVideo(data._id).subscribe()
    } else {
      const data = this.videoSuggestions[this.currentIndex] as IVideoDetails
      this.likeCount++
      this.like = true
      this.currentVideo.like.push(this.userId as never)
      this._userService.likeVideo(data._id).subscribe()
    }

  }



  // component


  likes = 15000;
  dislikes = 150;
  newComment = '';


  toggleSubscribe() {
    if (this.isSubscribed) {
      const index = this.currentVideo.artistId.subscribers.findIndex((v) => v === this.userId)
      this.currentVideo.artistId.subscribers.splice(index, 1)
      this.isSubscribed = false
      this._userService.subscribeUser(this.artistId).subscribe()
    } else {
      this.currentVideo.artistId.subscribers.push(this.artistId as never)
      this.isSubscribed = true
      this._userService.subscribeUser(this.artistId).subscribe()
    }
  }


  incrementDislikes() {
    this.dislikes++;
  }

  addComment(comment: string) {
    const obj: IVideoCommentDto = {
      videoId: this.currentVideoId,
      comment: comment,
    }
    this._userService.commentVideo(obj).subscribe((data)=>{
      this.commentId = data.commentId
    })
  }
  newLikeComment(commentId: string) {
    this.newLikeCommentId = commentId
    this.likeComment(this.newLikeCommentId)
  }

  likeComment(commentId:string) {
    this._userService.likeComment(commentId).subscribe()
  }   
   


}
