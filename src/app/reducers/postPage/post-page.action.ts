import { createAction, props } from '@ngrx/store';
import { Post } from '../../shared/interfaces';

export const load = createAction(
  '[Post Page] Load',
  props<Post>()
);

export const pushComment = createAction(
  '[Post Page] Push comment',
  props<{edges, page_info}>()
);

export const clear = createAction(
  '[Post Page] Clear'
);
