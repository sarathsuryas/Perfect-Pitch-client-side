import { createAction, props } from "@ngrx/store"

export const playPlaylistSong = createAction('[song]',props<{playlistId:string,songId:string,artistName:string,songs:string[],album:boolean}>())
export const nextSong = createAction('[song]',props<{index:number}>())
export const prevSong = createAction('[song]',props<{index:number}>())
export const setPlaylistId = createAction('[song]',props<{playlistId:string}>())
export const setPlaylistSongId = createAction('[song]',props<{songId:string,album:boolean,songs:string[]}>())
export const removeSongId = createAction('[song]')
