import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Album } from "./album.state";

export const selectAlbumState = createFeatureSelector<Album>('album')

export const selectAlbumId = createSelector(selectAlbumState,(albumState)=> albumState.albumId)

export const selectAlbumSongId = createSelector(selectAlbumState,(albumState)=>albumState.songId)

export const selectAlbumSong = createSelector(selectAlbumState,(albumState)=>albumState)