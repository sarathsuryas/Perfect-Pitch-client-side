import { createReducer, on } from "@ngrx/store";
import { SongInitialState } from "./song.state";
import { nextSong, playSong, prevSong, removeAlbumId, setAlbumId } from "./song.action";

export const songReducer = createReducer(
  SongInitialState,
  on(playSong,(state,action)=>({
   ...state,
   albumId:action.albumId,
   songId:action.songId,
   artistName:action.artistName
  })),
 
  // on(removeAlbumId,(state)=>({
  //   ...state,
  //   albumId:null
  // }))
)