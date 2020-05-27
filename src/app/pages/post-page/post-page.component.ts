import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InstagramApiService } from '../../shared/services/instagram-api.service';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PostPageState } from '../../shared/interfaces';
import { switchMap } from 'rxjs/operators';
import { clear, load } from '../../reducers/postPage/post-page.action';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  postPage$: Observable<PostPageState>;

  constructor(
    private route: ActivatedRoute,
    private instagramApiService: InstagramApiService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.postPage$ = this.store.select('postPage');



    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.store.dispatch(clear());
            return this.instagramApiService.getPostByShortcode(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        post => {
          this.store.dispatch(load({
            ...post.data.shortcode_media,
            taken_at_timestamp: new Date(post.data.shortcode_media.taken_at_timestamp * 1000),
            edge_media_to_parent_comment: {
              ...post.data.shortcode_media.edge_media_to_parent_comment,
              edges: post.data.shortcode_media.edge_media_to_parent_comment.edges.map(({node}) => ({
                ...node,
                created_at: new Date(node.created_at * 1000),
                edge_threaded_comments: {
                  ...node.edge_threaded_comments,
                  edges: node.edge_threaded_comments.edges.map(({node}) => (node))
                }
              }))
            },

          }));
        }
      );






  }

}
