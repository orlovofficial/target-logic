import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import { of } from "rxjs";
import { InstagramApiService } from "../shared/services/instagram-api.service";
import { User } from "../shared/interfaces";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  isMore: boolean = false;
  isMoreAll: boolean = false;
  isTable: boolean = false;
  userData: User = {};

  constructor(
    private route: ActivatedRoute,
    private instagramApiService: InstagramApiService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(() => {
          this.userData = {};
          this.isMore = false;
          this.isMoreAll = false;
          this.isTable = false;
        }),
        switchMap((params: Params) => {
          if (params['id']) {
            return this.instagramApiService.getUserByUsername(params['id'])
          }
          return of(null)
        })
      )
      .subscribe(
        user => {
          this.userData = user.graphql.user;
          this.isTable = true;
          console.log(user.graphql.user);
        }
    )
  }

  onMore() {

    if (this.userData.edge_owner_to_timeline_media.page_info.end_cursor) {
      this.isMore = true;
      this.isTable = false;
      this.instagramApiService.getPosts(this.userData.id, this.userData.edge_owner_to_timeline_media.page_info.end_cursor)
        .subscribe(res => {
          console.log(res);

          Array.prototype.push.apply(this.userData.edge_owner_to_timeline_media.edges, res.data.user.edge_owner_to_timeline_media.edges);

          this.userData.edge_owner_to_timeline_media.page_info.end_cursor = res.data.user.edge_owner_to_timeline_media.page_info.end_cursor;

          this.isMore = this.userData.edge_owner_to_timeline_media.page_info.end_cursor ? false : true;
          if (!this.isMore && this.isMoreAll) {
            this.onMore();
          } else {
            this.isTable = true;
          }
        });
    }

  }

  onMoreAll() {
    this.isMoreAll = true;
    this.onMore();
  }
}
