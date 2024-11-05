
export type Album = {
 songId:string ;
 albumId:string;
 artistName:string
 album:boolean
}
export const AlbumSongInitialState:Album = {
  songId: "",
  albumId: "",
  artistName: '',
  album: false
}