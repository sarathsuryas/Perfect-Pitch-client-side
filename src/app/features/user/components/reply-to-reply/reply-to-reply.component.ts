import { Component, Input } from '@angular/core';
import { IReplyToReply } from 'src/app/core/interfaces/IReplyToReply';
import { UserService } from '../../services/user/user.service';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-reply-to-reply',
  templateUrl: './reply-to-reply.component.html',
  styleUrls: ['./reply-to-reply.component.css']
})
export class ReplyToReplyComponent {
  replyToReply: string = '';
  showReplyToReplyInput: boolean = false
  @Input() showReplyInput: boolean = false
  @Input() replyToReplayData!: IReplyToReply
  @Input() userProfileImage: string = ''
  @Input() userName: string = ''  

  likeCount: number = 0
  like!: boolean
  constructor(private _commentService:CommentsService) {
 
  }
  ngOnInit(): void {
    if (this.replyToReplayData.likes.includes(this.replyToReplayData.userData._id as never)) {
      this.like = true
    } else {
      this.like = false
    }
    this.likeCount = this.replyToReplayData.likes.length
  }
  ngOnChanges(): void {
    this.likeCount = this.replyToReplayData.likes.length
  }
  likeReply(id: string) {
    if (this.like) {
      this.likeCount--
      this._commentService.likeReplyToReply(id).subscribe()
      this.like = false
    } else {
      this.likeCount++
      this._commentService.likeReplyToReply(id).subscribe()
      this.like = true
    }
  }

  toggleReplyToReply() {
    // this.showReplyToReplyInput = !this.showReplyToReplyInput
  }
  addReplyToReply() {

  }
  cancelReplyToReply() {
    this.showReplyToReplyInput = !this.showReplyToReplyInput
    this.replyToReply = ''
  }


}
