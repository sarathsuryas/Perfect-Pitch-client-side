import { ICurrentUser } from "./ICurrentUser";
import { IVideoDetails } from "./IVideoDetails";

export interface IShortsResponse {
  shorts:IVideoDetails[];
  user:ICurrentUser
}