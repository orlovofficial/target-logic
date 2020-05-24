import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { InstagramApiService } from '../../services/instagram-api.service';
import { Search } from '../../interfaces';



@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  searchCtrl: string = '';
  searchInput: Subject<string> = new Subject();
  search: Search[] = [];

  constructor(private instagramApiService: InstagramApiService) {
    this.searchInput
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => value !== undefined),
        filter(v => {
          const isSearch = v?.trim().length !== 0;
          if (!isSearch) this.search = [];
          return isSearch;
        }),
        switchMap(() => {
          return this.instagramApiService.search(this.searchCtrl);
        })
      )
      .subscribe(res => {

        this.search = [];
        res.users.forEach(u => {this.search.push({
          img: u.user.profile_pic_url,
          name: u.user.username,
          title: u.user.full_name,
          position: u.position,
          href: `/user/${u.user.username}`,
          is_verified: u.user.is_verified
        })});

        res.hashtags.forEach(u => {this.search.push({
          img: '/assets/tag.png',
          name: `#${u.hashtag.name}`,
          title: `${u.hashtag.media_count} публикаций`,
          position: u.position
        })});

        res.places.forEach(u => {this.search.push({
          img: '/assets/location.png',
          name: u.place.location.name,
          title: ``,
          position: u.position
        })});

        this.search.sort((a: Search, b: Search) => a.position > b.position ? 1 : -1);
      });
  }

  onClick() {
    this.searchCtrl = '';
    this.search = [];
  }

  handleChange(event){
    this.searchInput.next(event);
  }

  ngOnInit(): void {
  }

}
