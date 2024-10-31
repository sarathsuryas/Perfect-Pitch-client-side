
export interface IAlbumDetails {
  _id:string;
  title:string;
  uuid:string
  visibility:boolean;
  thumbNailLink:string;
  artistDetails:{
    _id:string;
    fullName:string;
  }
}