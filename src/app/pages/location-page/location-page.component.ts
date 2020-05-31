import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { UserPageState } from '../../shared/interfaces';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InstagramApiService } from '../../shared/services/instagram-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { catchError, switchMap } from 'rxjs/operators';
import { clear, loadPlace, loadTag, loadToggle, pushPost } from '../../reducers/userPage/user-page.action';
import { clearSearch } from '../../reducers/search/search.action';

@Component({
  selector: 'app-location-page',
  templateUrl: './location-page.component.html',
  styleUrls: ['./location-page.component.scss']
})
export class LocationPageComponent implements OnInit {

  location: string = '';
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


          this.store.select('userPage').subscribe((place) => {this.location = place.location.id;})

          if (params['id'] !== this.location) {

            this.store.dispatch(clear());
            return this.instagramApiService.getLocation(params['id'], params['slug']);
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
        (place) => {
          this.store.dispatch(clearSearch());
          this.store.dispatch(loadPlace({
            ...place.graphql.location,
            edge_location_to_media: {
              ...place.graphql.location.edge_location_to_media,
              edges: place.graphql.location.edge_location_to_media.edges.map(({node}) => ({...node}))
            },
            edge_location_to_top_posts: {
              ...place.graphql.location.edge_location_to_top_posts,
              edges: place.graphql.location.edge_location_to_top_posts.edges.map(({node}) => ({...node}))
            }
          }));
        }
      );
  }

  onLoad(id, {end_cursor, has_next_page}): void {
    if (has_next_page) {
      this.store.dispatch(loadToggle());
      this.instagramApiService.getPostsLocation(id, end_cursor).subscribe(({data}) => {
        this.store.dispatch(pushPost({
          edges: [...data.location.edge_location_to_top_posts.edges.map(post => post.node), ...data.location.edge_location_to_media.edges.map(post => post.node)],
          page_info: data.location.edge_location_to_media.page_info
        }));
        this.store.dispatch(loadToggle());
      });
    }
  }

}
