import { createAction, props } from '@ngrx/store';
import { Place, Post, Tag, User } from '../../shared/interfaces';

export const load = createAction(
  '[User Page] Load',
  props<User>()
);

export const loadTag = createAction(
  '[User Page] Load Tag',
  props<Tag>()
);

export const loadPlace = createAction(
  '[User Page] Load Place',
  props<Place>()
);

export const pushPost = createAction(
  '[User Page] Push post',
  props<{edges: Post[], page_info}>()
);

export const setViewType = createAction(
  '[User Page] Set View Type',
  props<{viewType: string}>()
);

export const clear = createAction(
  '[User Page] Clear'
);

export const loadToggle = createAction(
  '[User Page] Load Toggle'
);
