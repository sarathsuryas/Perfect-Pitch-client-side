import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { computedStyle } from 'video.js/dist/types/utils/dom';
import { UserService } from '../../services/user.service';
import { ICommentReply } from 'src/app/core/interfaces/ICommentReply';
interface Comment {
  replyText: string;
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  dislikes: number;
  timestamp: string;
  replies: Comment[];
  showReplyInput:boolean
}

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnChanges {

  @Input() comment!:ICommentResponse
  @Input() userId:string = ''
  @Input() userProfileImage:string = ''
  @Input() userName:string = ''
  commentId:string = ''
  replies:ICommentReply[] = []
  like:number = 0 
  showReplyInput:boolean = false
  liked!:boolean
  reply:string = ''
constructor(private _userService:UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
   
    if(this.comment.likes.includes(this.userId as never)) {
      this.liked = true
    } else {
      this.liked = false
    }
    this.like = this.comment.likes.length
    
  }
 
  
  
  likeComment() {
   if(this.liked) {
    this.liked = false
    this.like--
    this._userService.likeComment(this.comment._id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.error(error)
      }
     })
   } else {
    this.liked = true
    this.like++
    this._userService.likeComment(this.comment._id).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.error(error)
      }
     })
   }
   
  }

 

  toggleReplyInput(commentId:string) {
    this.showReplyInput = !this.showReplyInput
    this.commentId = commentId
    this._userService.getReply(this.commentId).subscribe({
      next:(data)=>{
        this.replies = data
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  cancelReply() {
      this.showReplyInput = false;
      this.reply = ''
  }


  
  addReply() {
    const reply:ICommentReply = {
      _id: '',
      reply: this.reply,
      userId: {
        _id: '',
        profileImage: this.userProfileImage,
        fullName: this.userName
      },
      likes: [],
      tag: ''
    }
    this.replies.unshift(reply)
   
  this._userService.replyComment({commentId:this.comment._id,reply:this.reply,userId:this.comment.userId._id}).subscribe({
    next:(data)=>{
       this.reply = ''
      this._userService.getReply(this.commentId).subscribe({
        next:(data)=>{
          this.replies = data
        },
        error:(err)=>{
          console.error(err)
        }
      })
    },
    error:(err)=>{
      console.error(err)
    }
  })
  }

}
