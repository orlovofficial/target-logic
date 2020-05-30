import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../reducers';
import { Post } from '../../../interfaces';

interface Analytics {
  posts: number;
  video: number;
  allLikes: number;
  allComments: number;
  allViews: number;
  followers: number;
  postsWeek: number;
  postsMonth: number;
}

@Component({
  selector: 'app-widget-user',
  templateUrl: './widget-user.component.html',
  styleUrls: ['./widget-user.component.scss']
})
export class WidgetUserComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    elements: {
      point:{
        radius: 0
      }
    },
    scales: {
      xAxes: [ {
        ticks: {
          display: false
        },
        gridLines: {
          display: false
        }
      } ],
      yAxes: [ {
        ticks: {
          display: false,
          maxTicksLimit: 5
        },
        gridLines: {
          display: false
        }
      } ]
    }
  };

  public chartLabels = [];
  public chartType = 'line';
  public chartLegend = false;

  public chartData = [];

  analytics: Analytics;

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

      this.chartLabels = [];
      this.chartData = [{
        data: [],
        label: 'Лайки',
        borderColor: 'rgb(63, 81, 181)',
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        borderWidth: 1
      },{
        data: [],
        label: 'Комментарии',
        borderColor: 'rgb(31,173,87)',
        backgroundColor: 'rgba(31, 173, 87, 0.1)',
        borderWidth: 1
      }];

      this.analytics = data.edge_owner_to_timeline_media.edges.reduce((result: Analytics, post: Post) => {

        const datePost = new Date(+post.taken_at_timestamp * 1000);
        const dateNow = Date.now();
        const day = (dateNow - datePost.getTime()) / (1000 * 3600 * 24);

        this.chartLabels.unshift(`Пост от ${datePost.getDate()}.${datePost.getMonth() + 1}.${datePost.getFullYear()} ${datePost.getHours()}:${datePost.getMinutes()}`);
        this.chartData[0].data.unshift(+post.edge_media_preview_like.count);
        this.chartData[1].data.unshift(+post.edge_media_to_comment.count);



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
