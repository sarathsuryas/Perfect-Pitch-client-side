export interface ISubmitSongDetailsDto {
  title:string;
  genre:string;
  thumbNailUniqueKey:string;
  songUniqueKey:string;
}

interface tracks {
  name:string;
  song:File
  songThumbNail:File
  thumbNailUniqueKey:string;
  songUniqueKey:string
}



export interface IAlbumDetails {
  albumName:string;
  albumThumbnail:File;
  genreId:string;
  thumbNailUniqueKey:string;
  tracks:tracks[]
}