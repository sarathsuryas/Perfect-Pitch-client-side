import { createReducer, on } from "@ngrx/store";
import { SongInitialState } from "./song.state";
import { playSong } from "./song.action";

export const songReducer = createReducer(
  SongInitialState,
  on(playSong,(state,action)=>({
    ...state,
    songs:action.songs,
    index:action.index
  }))
)