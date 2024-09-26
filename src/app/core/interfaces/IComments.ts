export interface IComments {
  replyText?: string;
  showReplyInput?: any;
  _id: string;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  dislikes: number;
  timestamp: string;
  replies: Comment[];
}