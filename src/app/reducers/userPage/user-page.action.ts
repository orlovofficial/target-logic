import { createAction, props } from '@ngrx/store';
import { Post, User } from '../../shared/interfaces';

export const load = createAction(
  '[User Page] Load',
  props<User>()
);

export const pushPost = createAction(
  '[User Page] Push post',
  props<{edges: Post[], page_info}>()
);

export const setViewType = createAction(
  '[User Page] Set View Type',
  props<{viewType: string}>()
);
