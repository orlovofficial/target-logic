import { SearchState, UserPageState } from '../shared/interfaces';

export  interface AppState {
  search: SearchState,
  userPage?: UserPageState
}
