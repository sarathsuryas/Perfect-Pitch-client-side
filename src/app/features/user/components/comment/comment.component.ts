import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommentDetails } from 'src/app/core/interfaces/ICommentDetails';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { UserService } from '../../services/user/user.service';

// interface Comment {
//   showReplyInput: boolean;
//   replyText: any;
//   id: number;
//   author: string;
//   avatar: string;
//   content: string;
//   likes: number;
//   dislikes: number;
//   timestamp: string;
//   replies: Comment[];
// }

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{

  @Input() userProfileImage: string = ''
  @Input() userName: string = ''
  @Output() comment = new EventEmitter<string>();
  @Input() commentId: string = ''
  @Output() cId = new EventEmitter<string>()
  @Input() userId: string = ''
  @Input() videoId:string = ''
  comments:ICommentResponse[] = []
  currentUser = {
    name: 'Current User',
    avatar: 'kldfdfsdpl'
  };
  constructor(private readonly _userService:UserService) { }
  ngOnInit(): void {
    
   }
  ngOnChanges() {
    console.log(this.userName)

    if(this.videoId) {
      this._userService.getComments(this.videoId).subscribe({
        next:(data)=>{
          this.comments = data
        },
        error:(error)=>{
          console.error(error)
        }
      })
    }
  }

  newCommentText = '';


  addComment() {
    this.comment.emit(this.newCommentText)
    
      if (this.newCommentText.trim()) {
        const newComment: ICommentResponse = {
          comment: this.newCommentText,
          likes: [],
          userId: {
            _id:this.userId,
            fullName: this.userName,
            profileImage: this.userProfileImage
          },
          _id: this.commentId,
          videoId: ''
        };

        this.comments.unshift(newComment);
        this.newCommentText = '';
      }
  
  }






}
