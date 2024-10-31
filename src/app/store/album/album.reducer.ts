import { createReducer, on } from "@ngrx/store";
import { AlbumSongInitialState } from "./album.state";
import { nextSong,  playAlbumSong, prevSong, removeAlbumId, setAlbumId, setAlbumSongId } from "./album.action";
import { act } from "@ngrx/effects";
import { removeSongId } from "../playlist/playlist.action";

export const albumReducer = createReducer(
  AlbumSongInitialState,
  on(playAlbumSong,(state,action)=>({
   ...state,
   albumId:action.albumId,
   songId:action.songId,
   artistName:action.artistName,
   album:action.album
  })),
  on(setAlbumSongId,(state,action)=>({
    ...state,
    songId:action.songId,
    album:action.album
  })),
  on(removeSongId,(state)=>({
    ...state,
    songId:null
  }))
)