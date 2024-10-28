
  export interface IReplyToReply {
    _id:string;
    replyToReply:string;
    userData:{
      _id:string;
      profileImage:string;
      fullName:string;
    };
    likes:string[];
    tag:string
  }
