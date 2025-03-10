import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { computedStyle } from 'video.js/dist/types/utils/dom';
import { UserService } from '../../services/user/user.service';
import { ICommentReply } from 'src/app/core/interfaces/ICommentReply';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/store/user/user.selector';
import {CommentsService} from 'src/app/features/user/services/comments/comments.service'
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
  showReplyInput: boolean
}

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnChanges {

  @Input() comment!: ICommentResponse
   userId: string = ''
  userProfileImage: string = ''
   userName: string = ''
  commentId: string = ''
  replies: ICommentReply[] = []
  like: number = 0
  showReplyInput: boolean = false
  liked!: boolean
  reply: string = ''
  constructor(private _commentService:CommentsService,private _store:Store) { 
    this._store.select(selectUserData).subscribe({
      next:(value)=>{
        this.userId = value?._id as string
        this.userName = value?.fullName as string
        this.userProfileImage = value?.profileImage as string
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.comment.likes.includes(this.userId as never)) {
      this.liked = true
    } else {
      this.liked = false
    }
    this.like = this.comment.likes.length

  }



  likeComment() {
    if (this.liked) {
      this.liked = false
      this.like--
      this._commentService.likeComment(this.comment._id).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.error(error)
        }
      })
    } else {
      this.liked = true
      this.like++
      this._commentService.likeComment(this.comment._id).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.error(error)
        }
      })
    }

  }



  toggleReplyInput(commentId: string) {
    this.showReplyInput = !this.showReplyInput
    this.commentId = commentId
    this._commentService.getReply(this.commentId).subscribe({
      next: (data) => {
        this.replies = data
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  cancelReply() {
    this.showReplyInput = false;
    this.reply = ''
  }



  addReply() {

    const reply: ICommentReply = {
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

    this._commentService.replyComment({ commentId: this.comment._id, reply: this.reply, userId: this.userId }).subscribe({
      next: (data) => {
        this.reply = ''
        this._commentService.getReply(this.commentId).subscribe({
          next: (data) => {
            this.replies = data
          },
          error: (err) => {
            console.error(err)
          }
        })
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
