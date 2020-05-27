import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input() type: string = 'posts';
  text: string = '';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

    if (this.type === 'posts') {
      this.store.select('userPage').subscribe(({data}) => {
        if (data.edge_owner_to_timeline_media) {
          this.text = data.edge_owner_to_timeline_media.edges.reduce((str, post) => (str + `"${post.id}","${post.shortcode}","${post.__typename}","${post.display_url}","${post.location?.id}","${post.location?.name}","${post.location?.slug}","${post.edge_media_to_caption.edges[0]?.node.text.replace(/\n/g, ' ')}","${post.taken_at_timestamp}","${post.edge_media_preview_like.count}","${post.edge_media_to_comment.count}","${post.video_view_count}","${post.comments_disabled}","${post.owner.id}","${post.owner.username}","${post.accessibility_caption}"\n`), '');
        }
      });
    }

    if (this.type === 'comments') {
      this.store.select('postPage').subscribe(({data}) => {
        if (data.edge_media_to_parent_comment) {
          this.text = data.edge_media_to_parent_comment.edges.reduce((str, comment) => (str + `"${comment.created_at}","${comment.owner.username}","${comment.text.replace(/\n/g, ' ')}"\n`), '');
        }
      });
    }


  }

}
