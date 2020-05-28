import { createReducer, on } from '@ngrx/store';
import { clearSearch, load } from './search.action';
import { Search, SearchState } from '../../shared/interfaces';

export const initialState: SearchState = {
  searchList: []
};

const _searchReducer = createReducer(initialState,
  on(load, (state, {result}) => ({
    searchList: [...result]
      .sort((a: Search, b: Search) => a.position > b.position ? 1 : -1)
  })),
  on(clearSearch, state => ({searchList: []}))
);

export function searchReducer(state, action) {
  return _searchReducer(state, action);
}
