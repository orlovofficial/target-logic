import { Place, Tag, User, UserPageState } from '../../shared/interfaces';
import { createReducer, on } from '@ngrx/store';
import { clear, load, loadPlace, loadTag, loadToggle, pushPost, setViewType } from './user-page.action';

export const initialState: UserPageState = {
  data: {},
  hashtag: {},
  location: {},
  viewType: 'gallery',
  isLoadNow: false
}

const _userPageReducer = createReducer(initialState,
  on(load, (state: UserPageState, user: User) => ({
    ...state,
    data: user
  })),
  on(loadTag, (state: UserPageState, tag: Tag) => ({
    ...state,
    data: {
      edge_owner_to_timeline_media: {
        ...tag.edge_hashtag_to_media,
        edges: [...tag.edge_hashtag_to_top_posts.edges, ...tag.edge_hashtag_to_media.edges]
      }
    },
    hashtag: tag
  })),


  on(loadPlace, (state: UserPageState, location: Place) => ({
    ...state,
    location: location,
    data: {
      edge_owner_to_timeline_media: {
        ...location.edge_location_to_media,
        edges: [...location.edge_location_to_top_posts.edges, ...location.edge_location_to_media.edges]
      }
    }
  })),


  on(pushPost, (state: UserPageState, {edges, page_info}) => ({
    ...state,
    data: {
      ...state.data,
      edge_owner_to_timeline_media: {
        edges: [
          ...state.data.edge_owner_to_timeline_media.edges,
          ...edges
        ],
        count: state.data.edge_owner_to_timeline_media.count,
        page_info: page_info
      }
    }
  })),
  on(setViewType, (state: UserPageState, {viewType}) => ({
    ...state,
    viewType
  })),
  on(clear, (state: UserPageState) => ({
    ...state,
    data: {},
    hashtag: {},
    location: {},
    isLoadNow: false
  })),
  on(loadToggle, (state: UserPageState) => ({
    ...state,
    isLoadNow: !state.isLoadNow
  }))
);

export function userPageReducer(state, action) {
  return _userPageReducer(state, action);
}
