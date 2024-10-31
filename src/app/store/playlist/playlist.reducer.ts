import { createReducer, on } from "@ngrx/store";
import { PlaylistSongInitialState } from "./playlist.state";
import { playPlaylistSong, removeSongId, setPlaylistSongId } from "./playlist.action";

export const playlistReducer = createReducer(
  PlaylistSongInitialState,
  on(playPlaylistSong,(state,action)=>({
   ...state,
   artistName:action.artistName,
   playlistId:action.playlistId,
   songId:action.songId,
   songs:action.songs,
   album:action.album
  })),
  on(setPlaylistSongId,(state,action)=>({
    ...state,
    songId:action.songId,
    album:action.album
  })),
 
)