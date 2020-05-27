import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Search, SearchState } from '../../interfaces';
import { InstagramApiService } from '../../services/instagram-api.service';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { load, clear } from '../../../reducers/search/search.action';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchCtrl: string = '';
  searchInput: Subject<string> = new Subject();
  search$: Observable<SearchState>;

  constructor(
    private instagramApiService: InstagramApiService,
    private store: Store<AppState>
  ) {
    this.search$ = store.select('search');
    this.searchInput
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => value !== undefined),
        filter(v => {
          const isSearch = v?.trim().length !== 0;
          if (!isSearch) this.store.dispatch(clear());
          return isSearch;
        }),
        switchMap(() => {
          return this.instagramApiService.search(this.searchCtrl);
        })
      )
      .subscribe(res => {
        const newSearch: Search[] = [
          ...res.users.map(({user, position}) => ({
            img: user.profile_pic_url,
            name: user.username,
            title: user.full_name,
            position: position,
            href: `/user/${user.username}`,
            is_verified: user.is_verified
          })),

          ...res.hashtags.map(({hashtag, position}) => ({
            img: '/assets/tag.png',
            name: `#${hashtag.name}`,
            title: `${hashtag.media_count} публикаций`,
            position: position
          })),

          ...res.places.map(({place, position}) => ({
            img: '/assets/location.png',
            name: place.location.name,
            title: '',
            position: position
          }))
        ];
        store.dispatch(load({result: newSearch}));

      });
  }

  onClick() {
    this.searchCtrl = '';
    this.store.dispatch(clear());
  }

  handleChange(event) {
    this.searchInput.next(event);
  }

  ngOnInit(): void {
  }

}