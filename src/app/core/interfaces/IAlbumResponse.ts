import { IAudioData } from "./IAudioData";

export interface IAlbumResponse {
  _id:string;
  title:string;
  uuid:string
  visibility:boolean;
  thumbNailLink:string;
  artistDetails:{
    _id:string;
    fullName:string;
  }
  songs:IAudioData[]
}