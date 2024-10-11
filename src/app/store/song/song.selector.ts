import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Songs } from "./song.state";

export const selectSongsState = createFeatureSelector<Songs>('song')

export const selectSongs =  createSelector(
  selectSongsState,
  (songsState)=> songsState
)