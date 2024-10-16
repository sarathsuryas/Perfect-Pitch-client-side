import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICommentDetails } from 'src/app/core/interfaces/ICommentDetails';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { UserService } from '../../services/user.service';

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



  toggleReplyInput() {
    // comment.showReplyInput = !comment.showReplyInput;
    // if (!comment.showReplyInput) {
    //   comment.replyText = '';
    // }
  }

  cancelReply() {
    // comment.showReplyInput = false;
    // comment.replyText = '';
  }

  addReply() {
    // if (comment.replyText && comment.replyText.trim()) {
    //   const newReply: ICommentDetails = {
    //     comment: comment.replyText,
    //     likes: 0,
    //     dislikes: 0,
    //     timestamp: 'Just now',
    //     replies: [],
    //     showReplyInput: undefined,
    //     userId: ''
    //   };
    //   comment.replies.push(newReply as never);
    //   this.cancelReply(comment);
    // }
  }



  // sample

  // currentUser = {
  //   name: 'Current User',
  //   avatar: '/placeholder.svg?height=40&width=40'
  // };

  // comments: Comment[] = [
  //   {
  //     id: 1,
  //     author: 'John Doe',
  //     avatar: '/placeholder.svg?height=40&width=40&text=JD',
  //     content: 'This is a great video! Thanks for sharing.',
  //     likes: 15,
  //     dislikes: 2,
  //     timestamp: '2 days ago',
  //     replies: [
  //       {
  //         id: 2,
  //         author: 'Jane Smith',
  //         avatar: '/placeholder.svg?height=40&width=40&text=JS',
  //         content: 'I agree, very informative!',
  //         likes: 5,
  //         dislikes: 0,
  //         timestamp: '1 day ago',
  //         replies: [],
  //         showReplyInput: false,
  //         replyText: undefined
  //       }
  //     ],
  //     showReplyInput: false,
  //     replyText: undefined
  //   },
  //   {
  //     id: 3,
  //     author: 'Bob Johnson',
  //     avatar: '/placeholder.svg?height=40&width=40&text=BJ',
  //     content: 'Could you make a follow-up video on this topic?',
  //     likes: 7,
  //     dislikes: 1,
  //     timestamp: '3 days ago',
  //     replies: [],
  //     showReplyInput: false,
  //     replyText: undefined
  //   }
  // ];

  // newCommentText = '';

  // addComment() {
  //   if (this.newCommentText.trim()) {
  //     const newComment: Comment = {
  //       id: this.comments.length + 1,
  //       author: this.currentUser.name,
  //       avatar: this.currentUser.avatar,
  //       content: this.newCommentText,
  //       likes: 0,
  //       dislikes: 0,
  //       timestamp: 'Just now',
  //       replies: [],
  //       showReplyInput: false,
  //       replyText: undefined
  //     };
  //     this.comments.unshift(newComment);
  //     this.newCommentText = '';
  //   }
  // }

  // likeComment(comment: Comment) {
  //   comment.likes++;
  // }

  // dislikeComment(comment: Comment) {
  //   comment.dislikes++;
  // }

  // toggleReplyInput(comment: Comment) {
  //   comment.showReplyInput = !comment.showReplyInput;
  //   if (!comment.showReplyInput) {
  //     comment.replyText = '';
  //   }
  // }

  // cancelReply(comment: Comment) {
  //   comment.showReplyInput = false;
  //   comment.replyText = '';
  // }

  // addReply(comment: Comment) {
  //   if (comment.replyText && comment.replyText.trim()) {
  //     const newReply: Comment = {
  //       id: comment.replies.length + 1,
  //       author: this.currentUser.name,
  //       avatar: this.currentUser.avatar,
  //       content: comment.replyText,
  //       likes: 0,
  //       dislikes: 0,
  //       timestamp: 'Just now',
  //       replies: [],
  //       replyText: undefined,
  //       showReplyInput: false
  //     };
  //     comment.replies.push(newReply);
  //     this.cancelReply(comment);
  //   }
  // }




}
