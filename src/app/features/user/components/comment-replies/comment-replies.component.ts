import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICommentReply } from 'src/app/core/interfaces/ICommentReply';
import { UserService } from '../../services/user/user.service';
import { IReplyToReply } from 'src/app/core/interfaces/IReplyToReply';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.css']
})
export class CommentRepliesComponent implements OnChanges, OnInit {
  replyToReply: string = '';
  showReplyToReplyInput: boolean = false;
  @Input() showReplyInput: boolean = false;
  @Input() reply!: ICommentReply;
  @Input() userProfileImage: string = ''
  @Input() userName: string = ''  
  @Input() userId:string = ''

  likeCount: number = 0;
  like!: boolean;
  replyToReplis: IReplyToReply[] = [];
  constructor(private _commentService:CommentsService) {

  }
  ngOnInit(): void {
    if (this.reply.likes.includes(this.reply.userId._id as never)) {
      this.like = true
    } else {
      this.like = false
    }
    this.likeCount = this.reply.likes.length
  }
  ngOnChanges(): void {
    this.likeCount = this.reply.likes.length
  }
  likeReply(replyId: string) {
    if (this.like) {
      this.likeCount--
      this._commentService.likeReply(replyId).subscribe()
      this.like = false
    } else {
      this.likeCount++
      this._commentService.likeReply(replyId).subscribe()
      this.like = true
    }
  }

  toggleReplyToReply() {
    this.showReplyToReplyInput = !this.showReplyToReplyInput
    this._commentService.getRepliesToReply(this.reply._id).subscribe({
      next: (value) => {
        this.replyToReplis = value
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  addReplyToReply() {
    const replyToReplay: IReplyToReply = {
      _id: '',
      replyToReply: this.replyToReply,
      userData: {
        _id: '',
        profileImage: this.userProfileImage,
        fullName: this.userName
      },
      likes: [],
      tag: ''
    }
    this.replyToReplis.unshift(replyToReplay)

    this._commentService.replyToReply({ replyId: this.reply._id, userId: this.userId, replyToReply: this.replyToReply, likes: [] }).subscribe({
      next: (value) => {
        if (value) {
          this.replyToReply = ''
          this._commentService.getRepliesToReply(this.reply._id).subscribe({
            next: (value) => {
              this.replyToReplis = value
            },
            error: (err) => {
              console.error(err)
            }
          })
        }
      },
      error: (err) => {
        console.error(err)
      }
    })


  }
  cancelReplyToReply() {
    this.showReplyToReplyInput = !this.showReplyToReplyInput
    this.replyToReply = ''
  }



}
