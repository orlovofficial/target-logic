import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { InstagramApiService } from '../../shared/services/instagram-api.service';
import { UserPageState } from '../../shared/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { load, pushPost } from '../../reducers/userPage/user-page.action';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userPage$: Observable<UserPageState>;

  constructor(
    private route: ActivatedRoute,
    private instagramApiService: InstagramApiService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.userPage$ = this.store.select('userPage');

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            return this.instagramApiService.getUserByUsername(params['id']);
          }
          return of(null);
        })
      )
      .subscribe(
        user => {
          this.store.dispatch(load({
            ...user.graphql.user,
            edge_owner_to_timeline_media: {
              ...user.graphql.user.edge_owner_to_timeline_media,
              edges: user.graphql.user.edge_owner_to_timeline_media.edges.map(({node}) => ({...node}))
            }
          }));
        }
      );
  }

  onLoad(id, {end_cursor, has_next_page}) {
    if (has_next_page) {
      this.instagramApiService.getPosts(id, end_cursor).subscribe(({data}) => {
        this.store.dispatch(pushPost({
          edges: [...data.user.edge_owner_to_timeline_media.edges.map(post => post.node)],
          page_info: data.user.edge_owner_to_timeline_media.page_info
        }));
      })
    }
  }



}
