import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { UserPageState } from '../../shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InstagramApiService } from '../../shared/services/instagram-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { catchError, switchMap } from 'rxjs/operators';
import { clear, loadTag, loadToggle, pushPost } from '../../reducers/userPage/user-page.action';
import { clearSearch } from '../../reducers/search/search.action';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {

  tag: string = '';
  userPage$: Observable<UserPageState>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instagramApiService: InstagramApiService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.userPage$ = this.store.select('userPage');

    this.route.params
      .pipe(
        switchMap((params: Params) => {


          this.store.select('userPage').subscribe((tag) => {this.tag = tag.hashtag.name;})

          if (params['id'] !== this.tag) {

            this.store.dispatch(clear());
            return this.instagramApiService.getTag(params['id']);
          }
          return of(null);
        })
      )
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            this.router.navigate(['/error']);
          };
          return EMPTY;
        })
      )
      .subscribe(
        tag => {
          this.store.dispatch(clearSearch());
          this.store.dispatch(loadTag({
            ...tag.graphql.hashtag,
            edge_hashtag_to_media: {
              ...tag.graphql.hashtag.edge_hashtag_to_media,
              edges: tag.graphql.hashtag.edge_hashtag_to_media.edges.map(({node}) => ({...node}))
            },
            edge_hashtag_to_top_posts: {
              edges: tag.graphql.hashtag.edge_hashtag_to_top_posts.edges.map(({node}) => ({...node}))
            }
          }));
        }
      );
  }

  onLoad(tag, {end_cursor, has_next_page}): void {
    if (has_next_page) {
      this.store.dispatch(loadToggle());
      this.instagramApiService.getPostsHashtag(tag, end_cursor).subscribe(({data}) => {
        this.store.dispatch(pushPost({
          edges: [...data.hashtag.edge_hashtag_to_top_posts.edges.map(post => post.node), ...data.hashtag.edge_hashtag_to_media.edges.map(post => post.node)],
          page_info: data.hashtag.edge_hashtag_to_media.page_info
        }));
        this.store.dispatch(loadToggle());
      });
    }
  }

}
