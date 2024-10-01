
export interface ICommentResponse {
  _id:string,
    videoId:string,
    comment:string,
    userId: {
      _id:string;
      fullName:string;
      profileImage:string 
    }
    likes:[],
}  