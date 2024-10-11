export interface ISumbitAlbumDetails {
  title:string;
  genreId:string
  thumbnailKey:string;
  songs:{title:string,uniqueKey:string}[]
}