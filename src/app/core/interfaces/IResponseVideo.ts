import { IVideoDetails } from "./IVideoDetails";

export interface IResponseVideo {
  video:IVideoDetails;
  suggestions:IVideoDetails[]
  userId:string;
  profileImage:string;
  userName:string;
}