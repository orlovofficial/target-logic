import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { setViewType } from '../../../reducers/userPage/user-page.action';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private store: Store<AppState>) { }

  onChange(value: string) {
    this.store.dispatch(setViewType({viewType: value}));
  }
}
