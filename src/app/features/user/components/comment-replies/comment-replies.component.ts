import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICommentReply } from 'src/app/core/interfaces/ICommentReply';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.css']
})
export class CommentRepliesComponent implements OnChanges,OnInit{

 @Input() showReplyInput:boolean = false
 @Input() reply!:ICommentReply 
 likeCount:number = 0
 like!:boolean
 constructor(private _userService:UserService) {

 }
  ngOnInit(): void {
    if(this.reply.likes.includes(this.reply.userId._id as never)){
     this.like = true
    } else {
      this.like = false
    }
    this.likeCount = this.reply.likes.length
  }
  ngOnChanges(): void {
    this.likeCount = this.reply.likes.length
  }
  likeReply(replyId:string) {
     if(this.like) {
      this.likeCount--
      this._userService.likeReply(replyId).subscribe()
      this.like = false
     } else {
      this.likeCount++
      this._userService.likeReply(replyId).subscribe()
      this.like = true
     }
  }
}
