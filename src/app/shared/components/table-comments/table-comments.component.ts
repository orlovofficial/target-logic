import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-table-comments',
  templateUrl: './table-comments.component.html',
  styleUrls: ['./table-comments.component.scss']
})
export class TableCommentsComponent implements OnInit {

  displayedColumns: string[] = [
    // 'select',
    //'owner_id',
    'pic',
    'username',
    //'is_verified',
    'text',
    'date',
    'like',
    'comments',
    //'id'
  ];
  dataSource;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private store: Store<AppState>) {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit(): void {
    this.store.select('postPage').subscribe(({data}) => {
      this.dataSource = new MatTableDataSource(data.edge_media_to_parent_comment?.edges.map(comment => ({
        owner_id: comment.owner.id,
        pic: comment.owner.profile_pic_url,
        username: comment.owner.username,
        is_verified: comment.owner.is_verified,
        text: comment.text,
        date: comment.created_at,
        like: comment.edge_liked_by.count,
        comments: comment.edge_threaded_comments.count,
        id: comment.id
      })));
      this.dataSource.sort = this.sort;
    });
  }

}
