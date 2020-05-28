import { createAction, props } from '@ngrx/store';
import { Search } from '../../shared/interfaces';

export const load = createAction(
  '[Search] Load',
  props<{result: Search[]}>()
);
export const clearSearch = createAction('[Search] Clear');
