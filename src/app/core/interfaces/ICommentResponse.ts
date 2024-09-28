
export interface ICommentResponse {
  _id:string,
    videoId:string,
    comment:string,
    userId: {
      fullName:string;
      profileImage:string 
    }
    likes:[],
}