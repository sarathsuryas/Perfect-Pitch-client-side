export interface ICommentDetails {
  userId:string;
  comment:string;
  likes: number,
  dislikes: number,
  timestamp:string;
  replies:any[]
  showReplyInput:any
  replyText?: string;
}