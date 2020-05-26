import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPageState } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  userPage$: Observable<UserPageState>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userPage$ = this.store.select('userPage');
  }

}
