import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';

@Component({
  selector: 'app-widget-user',
  templateUrl: './widget-user.component.html',
  styleUrls: ['./widget-user.component.scss']
})
export class WidgetUserComponent implements OnInit {

  analytics = {};

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('userPage').subscribe(({data}) => {
      let newanalytics = {
        posts: 0,
        video: 0,
        allLikes: 0,
        allComments: 0,
        allViews: 0,
        followers: +data.edge_followed_by.count,
        postsWeek: 0,
        postsMonth: 0
      };


      this.analytics = data.edge_owner_to_timeline_media.edges.reduce((result, post) => {
        const datePost = new Date(+post.taken_at_timestamp * 1000);
        const dateNow = Date.now();
        const day = (dateNow - datePost.getTime()) / (1000 * 3600 * 24);
        return {
          ...result,
          posts: result.posts + 1,
          allLikes: result.allLikes + post.edge_media_preview_like.count,
          allComments: result.allComments + post.edge_media_to_comment.count,
          allViews: post.video_view_count ? result.allViews + post.video_view_count : result.allViews,
          video: post.video_view_count ? result.video + 1 : result.video,
          postsWeek: day < 7 ? result.postsWeek + 1 : result.postsWeek,
          postsMonth: day < 30 ? result.postsMonth + 1 : result.postsMonth
        };
      }, newanalytics);
    });
  }

}
