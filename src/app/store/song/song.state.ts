import { IAudioData } from "src/app/core/interfaces/IAudioData"

export type Songs = {
  songs:IAudioData[],
  index:number|null
}
export const SongInitialState:Songs = {
  songs: [],
  index: null
}