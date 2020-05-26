import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { loadToggle, pushPost, setViewType } from '../../../reducers/userPage/user-page.action';
import { InstagramApiService } from '../../services/instagram-api.service';
import { Observable } from 'rxjs';
import { UserPageState } from '../../interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  userPage$: Observable<UserPageState>;

  constructor(
    private store: Store<AppState>,
    private instagramApiService: InstagramApiService) { }

  ngOnInit(): void {
    this.userPage$ = this.store.select('userPage');
  }

  onChange(value: string) {
    this.store.dispatch(setViewType({viewType: value}));
  }

  onLoadAll(id, {end_cursor, has_next_page}): void {
    if (has_next_page) {
      this.store.dispatch(loadToggle());
      this.instagramApiService.getPosts(id, end_cursor).subscribe(({data}) => {
          this.store.dispatch(pushPost({
            edges: [...data.user.edge_owner_to_timeline_media.edges.map(post => post.node)],
            page_info: data.user.edge_owner_to_timeline_media.page_info
          }));
        },
        () => {},
        () => {
          let info = {
            end_cursor: '',
            has_next_page: false
          };
          this.store.select('userPage').subscribe(({data}) => {info = data.edge_owner_to_timeline_media.page_info})
          if (info.has_next_page) {
            this.onLoadAll(id, info);
          }
          this.store.dispatch(loadToggle());
        });
    }
  }

}
