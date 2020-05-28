import { Post, PostPageState } from '../../shared/interfaces';
import { createReducer, on } from '@ngrx/store';
import { load, pushComment, clear, loadToggle, setViewType, pushThread } from './post-page.action';

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
        ...state.data.edge_media_to_parent_comment,
        edges: [
          ...state.data.edge_media_to_parent_comment.edges,
          ...edges
        ],
        page_info: page_info
      }
    }
  })),
  on(pushThread, (state: PostPageState, {comment_id, thread}) => ({
    ...state,
    data: {
      ...state.data,
      edge_media_to_parent_comment: {
        ...state.data.edge_media_to_parent_comment,
        edges: state.data.edge_media_to_parent_comment.edges.map((comment) => (comment.id === comment_id ? {
          ...comment,
          edge_threaded_comments: {
            ...comment.edge_threaded_comments,
            page_info: thread.page_info,
            edges: [...thread.edges, ...comment.edge_threaded_comments.edges]
          }
        } : comment))
      }
    }
  })),
  on(setViewType, (state: PostPageState, {viewType}) => ({
    ...state,
    viewType
  })),
  on(clear, (state: PostPageState) => ({
    ...state,
    data: {},
    isLoadNow: false
  })),
  on(loadToggle, (state: PostPageState) => ({
    ...state,
    isLoadNow: !state.isLoadNow
  }))
);

export function postPageReducer(state, action) {
  return _postPageReducer(state, action);
}
