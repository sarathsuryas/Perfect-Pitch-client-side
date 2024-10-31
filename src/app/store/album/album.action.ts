import { createAction, props } from "@ngrx/store";

export const playAlbumSong = createAction('[song]',props<{albumId:string,songId:string,artistName:string,album:true}>())
export const nextSong = createAction('[song]',props<{index:number}>())
export const prevSong = createAction('[song]',props<{index:number}>())
export const setAlbumId = createAction('[song]',props<{albumId:string}>())
export const setAlbumSongId = createAction('[song]',props<{songId:string,album:true}>())
export const removeAlbumId = createAction('[song]')

// export const playSong = createAction('[song]',props<{songs:IAudioData[],index:number}>())