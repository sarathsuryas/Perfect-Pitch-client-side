export interface ICommentReplyDto {
  commentId: string;
  userId: string;
  likes?: string[];
  reply: string;
}