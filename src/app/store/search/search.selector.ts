import { createFeatureSelector, createSelector } from '@ngrx/store';
import { search } from './search.state';

export const selectSearchState = createFeatureSelector<search>('search');

export const selectSearchQuery = createSelector(
  selectSearchState,
  (state) => state.name
);
