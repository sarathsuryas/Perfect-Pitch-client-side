import { IAudioData } from "./IAudioData";

export interface IUserPlaylists {
  uuid: string;
  _id: string;
  title: string;
  visibility: true;
  thumbNailLink:string;
  access: string;
  userId: string;
  songsId:IAudioData[];
  selected:boolean;
}