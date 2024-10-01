export interface ICommentReply {
  _id:string;
  reply:string;
  userId:{
    _id:string
    profileImage:string;
    fullName:string;
  };
  likes:string[];
  tag:string
}