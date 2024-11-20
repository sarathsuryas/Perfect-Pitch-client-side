import { createReducer, on } from "@ngrx/store";
import { MusicPlayerState } from "./player.state";
import { closePlayer, startPlayer } from "./player.action";

export const playerReducer = createReducer(
  MusicPlayerState,
  on(startPlayer,(state)=>({
    ...state,
    isPlayer:true
  })),
  on(closePlayer,(state)=>({
    ...state,
    isPlayer:false
  }))
)