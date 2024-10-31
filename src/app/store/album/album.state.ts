
export type Album = {
 songId:string | null;
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