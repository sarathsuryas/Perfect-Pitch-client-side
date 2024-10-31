import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Playlist } from "./playlist.state";

export const selectPlaylistState = createFeatureSelector<Playlist>('playlist')

export const selectPlaylistId = createSelector(selectPlaylistState,(playlistState)=> playlistState.playlistId)

export const selectPlaylistSongId = createSelector(selectPlaylistState,(playlistState)=>playlistState.songId)

export const selectPlaylistSong = createSelector(selectPlaylistState,(playlistState)=>playlistState)