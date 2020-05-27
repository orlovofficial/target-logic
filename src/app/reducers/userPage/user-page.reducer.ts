import { User, UserPageState } from '../../shared/interfaces';
import { createReducer, on } from '@ngrx/store';
import { clear, load, loadToggle, pushPost, setViewType } from './user-page.action';

export const initialState: UserPageState = {
  data: {},
  viewType: 'table-posts',
  isLoadNow: false
}

const _userPageReducer = createReducer(initialState,
  on(load, (state: UserPageState, user: User) => ({
    ...state,
    data: user
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
