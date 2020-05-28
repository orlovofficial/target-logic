import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../reducers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostPageState } from '../../interfaces';
import { InstagramApiService } from '../../services/instagram-api.service';
import { pushComment, pushThread } from '../../../reducers/postPage/post-page.action';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  postPage$: Observable<PostPageState>;

  constructor(
    private store: Store<AppState>,
    private instagramApiService: InstagramApiService
  ) { }

  ngOnInit(): void {
    this.postPage$ = this.store.select('postPage');
  }

  onThread(comment_id: string, { end_cursor, has_next_page }) {
    if (has_next_page) {
      this.instagramApiService.getThread(comment_id, end_cursor).subscribe(({data}) => {
        this.store.dispatch(pushThread({
          comment_id,
          thread: {
            page_info: data.comment.edge_threaded_comments.page_info,
            edges: data.comment.edge_threaded_comments.edges.map(({node}) => ({
              ...node,
              created_at: new Date(node.created_at * 1000)
            }))
          }

        }));
      });
    }
  }
}
