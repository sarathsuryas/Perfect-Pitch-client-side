import { IAudioData } from "src/app/core/interfaces/IAudioData"

export type Songs = {
 songId:string;
 albumId:string;
 artistName:string
}
export const SongInitialState:Songs = {
  songId: "",
  albumId: "",
  artistName:''
}