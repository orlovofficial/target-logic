import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from "rxjs/operators";
import { InstagramApiService } from "../../services/instagram-api.service";

export interface State {
  img: string;
  name: string;
  title: string;
  position: number;
  href?: string;
  is_verified?: boolean;
}

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  searchCtrl: string = '';
  searchInput: Subject<string> = new Subject();
  states: State[] = [];

  constructor(private instagramApiService: InstagramApiService) {
    this.searchInput
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => value !== undefined),
        filter(v => {
          const isSearch = v?.trim().length !== 0;
          if (!isSearch) this.states = [];
          return isSearch;
        }),
        switchMap(() => {
          return this.instagramApiService.search(this.searchCtrl);
        })
      )
      .subscribe(res => {

        this.states = [];
        res.users.forEach(u => {this.states.push({
          img: u.user.profile_pic_url,
          name: u.user.username,
          title: u.user.full_name,
          position: u.position,
          href: `/user/${u.user.username}`,
          is_verified: u.user.is_verified
        })});

        res.hashtags.forEach(u => {this.states.push({
          img: '/assets/tag.png',
          name: `#${u.hashtag.name}`,
          title: `${u.hashtag.media_count} публикаций`,
          position: u.position
        })});

        res.places.forEach(u => {this.states.push({
          img: '/assets/location.png',
          name: u.place.location.name,
          title: ``,
          position: u.position
        })});

        this.states.sort((a: State, b: State) => a.position > b.position ? 1 : -1);
      });
  }

  onClick() {
    this.searchCtrl = '';
    this.states = [];
  }

  handleChange(event){
    this.searchInput.next(event);
  }

  ngOnInit(): void {
  }

}
