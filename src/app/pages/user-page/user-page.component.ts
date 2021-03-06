import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, switchMap, takeWhile } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { InstagramApiService } from '../../shared/services/instagram-api.service';
import { UserPageState } from '../../shared/interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { clear, load, loadToggle, pushPost } from '../../reducers/userPage/user-page.action';
import { clearSearch } from '../../reducers/search/search.action';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  username: string = '';
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


          this.store.select('userPage').subscribe((user) => {this.username = user.data.username;})

          if (params['id'] !== this.username) {

            this.store.dispatch(clear());
            return this.instagramApiService.getUserByUsername(params['id']);
          }
          return EMPTY;
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
        user => {
          this.store.dispatch(clearSearch());
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

  onLoad(id, {end_cursor, has_next_page}): void {
    if (has_next_page) {
      this.store.dispatch(loadToggle());
      this.instagramApiService.getPosts(id, end_cursor).subscribe(({data}) => {
        this.store.dispatch(pushPost({
          edges: [...data.user.edge_owner_to_timeline_media.edges.map(post => post.node)],
          page_info: data.user.edge_owner_to_timeline_media.page_info
        }));
        this.store.dispatch(loadToggle());
      });
    }
  }




}
