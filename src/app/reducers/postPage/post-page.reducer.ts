import { Post, PostPageState } from '../../shared/interfaces';
import { createReducer, on } from '@ngrx/store';
import { load, pushComment, clear } from './post-page.action';

export const initialState: PostPageState = {
  data: {},
  viewType: 'comments-list',
  isLoadNow: false
};

export const _postPageReducer = createReducer(initialState,
  on(load, (state: PostPageState, post: Post) => ({
    ...state,
    data: post
  })),
  on(pushComment, (state: PostPageState, {edges, page_info}) => ({
    ...state,
    data: {
      ...state.data,
      edge_media_to_parent_comment: {
        edges: [
          ...state.data.edge_media_to_parent_comment.edges,
          ...edges
        ],
        page_info: page_info
      }
    }
  })),
  on(clear, (state: PostPageState) => ({
    ...state,
    data: {},
    isLoadNow: false
  }))
);

export function postPageReducer(state, action) {
  return _postPageReducer(state, action);
}
