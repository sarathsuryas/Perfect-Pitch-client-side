export interface ICommentDetails {
  _id:string;
  userId:string;
  userName:string;
  comment:string;
  profileImage:string;
  likes: number,
  dislikes: number,
  timestamp:string;
  replies:any[]
  showReplyInput:any
  replyText?: string;
}