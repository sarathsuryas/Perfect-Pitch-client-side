import { createReducer, on } from '@ngrx/store';
import { searchState } from './search.state';
import { search } from './search.action';




export const searchReducer = createReducer(
  searchState,
  on(search,(state,action)=>({
    ...state,
    name:action.query
  })),
  
);
