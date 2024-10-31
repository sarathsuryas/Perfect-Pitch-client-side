export interface IAudioData {
    _id:string
    title:string;
    uuid:string;
    genreId:string;
    thumbNailLink:string;
    artistId:{
      _id:string;
      fullName:string;
    }
}
