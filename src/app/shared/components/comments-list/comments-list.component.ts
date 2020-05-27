import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../reducers';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PostPageState } from '../../interfaces';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  postPage$: Observable<PostPageState>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postPage$ = this.store.select('postPage');
  }

}
