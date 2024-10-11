import { createAction, props } from "@ngrx/store";
import { IAudioData } from "src/app/core/interfaces/IAudioData";

export const playSong = createAction('[song]',props<{songs:IAudioData[],index:number}>())