import { IAudioData } from "src/app/core/interfaces/IAudioData";

export type Playlist = {
  songId:string | null;
  playlistId:string;
  artistName:string
  songs:string[]
  album:boolean
 }
 export const PlaylistSongInitialState:Playlist = {
   songId: "",
   playlistId: "",
   artistName: '',
   songs: [],
   album: false
 }