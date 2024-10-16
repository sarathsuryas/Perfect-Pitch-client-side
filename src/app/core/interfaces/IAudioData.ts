export interface IAudioData {
  _id:string
  title:string;
  link:string;
  thumbNailLink:string;
  artistId:{
    _id:string;
    fullName:string;
  }
  albumId:{
    _id:string;
    title:string
  }
  genre:string
}
