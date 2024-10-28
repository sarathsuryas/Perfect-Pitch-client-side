import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Songs } from "./song.state";

export const selectSongsState = createFeatureSelector<Songs>('song')

export const selectAlbumId = createSelector(selectSongsState,(songState)=> songState.albumId)

export const selectSongId = createSelector(selectSongsState,(songState)=>songState.songId)

export const selectSong = createSelector(selectSongsState,(songState)=>songState)