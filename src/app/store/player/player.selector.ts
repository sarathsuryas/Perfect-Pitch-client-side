import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Player } from "./player.state"

export const selectPlayerState = createFeatureSelector<Player>('player')

export const selectIsPlayer = createSelector(selectPlayerState,(playerState)=> playerState.isPlayer)