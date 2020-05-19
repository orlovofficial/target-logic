import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { auditTime, debounceTime, startWith } from "rxjs/operators";
import { InstagramApiService } from "../../services/instagram-api.service";

export interface State {
  img: string;
  name: string;
  title: string;
  position: number;
  href?: string;
}

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  searchCtrl: string = '';

  states: State[] = [];

  constructor(private instagramApiService: InstagramApiService) {

  }

  onClick() {
    this.searchCtrl = '';
  }

  handleChange(){
    this.instagramApiService.search(encodeURIComponent(this.searchCtrl)).subscribe(res => {
      console.log(res);

      this.states = [];
      res.users.forEach(u => {this.states.push({
        img: u.user.profile_pic_url,
        name: u.user.username,
        title: u.user.full_name,
        position: u.position,
        href: `/user/${u.user.username}`
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
    })
  }

  ngOnInit(): void {
  }

}
