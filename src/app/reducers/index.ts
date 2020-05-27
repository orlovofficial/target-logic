import { PostPageState, SearchState, UserPageState } from '../shared/interfaces';

export  interface AppState {
  search: SearchState,
  userPage?: UserPageState,
  postPage?: PostPageState
}
