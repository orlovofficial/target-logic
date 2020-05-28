import { createAction, props } from '@ngrx/store';
import { Post } from '../../shared/interfaces';

export const load = createAction(
  '[Post Page] Load',
  props<Post>()
);

export const pushComment = createAction(
  '[Post Page] Push Comment',
  props<{edges, page_info}>()
);

export const pushThread = createAction(
  '[Post Page] Push Thread',
  props<{comment_id, thread: {edges, page_info}}>()
);

export const setViewType = createAction(
  '[Post Page] Set View Type',
  props<{viewType: string}>()
);

export const clear = createAction(
  '[Post Page] Clear'
);

export const loadToggle = createAction(
  '[Post Page] Load Toggle'
);
