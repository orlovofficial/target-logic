import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostPageState } from '../../interfaces';
import { AppState } from '../../../reducers';
import { InstagramApiService } from '../../services/instagram-api.service';
import { loadToggle, pushComment, setViewType } from '../../../reducers/postPage/post-page.action';

@Component({
  selector: 'app-toolbar-comments',
  templateUrl: './toolbar-comments.component.html',
  styleUrls: ['./toolbar-comments.component.scss']
})
export class ToolbarCommentsComponent implements OnInit {

  postPage$: Observable<PostPageState>;

  constructor(
    private store: Store<AppState>,
    private instagramApiService: InstagramApiService) { }

  ngOnInit(): void {
    this.postPage$ = this.store.select('postPage');
  }

  onChange(value: string) {
    this.store.dispatch(setViewType({viewType: value}));
  }





  onLoadAll(shortcode, {end_cursor, has_next_page}): void {
    if (has_next_page) {
      this.store.dispatch(loadToggle());
      this.instagramApiService.getComments(shortcode, end_cursor).subscribe(({data}) => {
          this.store.dispatch(pushComment({
            edges: [...data.shortcode_media.edge_media_to_parent_comment.edges.map(({node}) => ({
              ...node,
              created_at: new Date(node.created_at * 1000),
              edge_threaded_comments: {
                ...node.edge_threaded_comments,
                edges: node.edge_threaded_comments.edges.map(({node}) => ({...node, created_at: new Date(node.created_at * 1000)}))
              }
            })).reverse()],
            page_info: data.shortcode_media.edge_media_to_parent_comment.page_info
          }));
        },
        () => {},
        () => {
          let info = {
            end_cursor: '',
            has_next_page: false
          };
          this.store.select('postPage').subscribe(({data}) => {info = data.edge_media_to_parent_comment?.page_info})
          if (info.has_next_page) {
            this.onLoadAll(shortcode, info);
          }
          this.store.dispatch(loadToggle());
        });
    }
  }








}
