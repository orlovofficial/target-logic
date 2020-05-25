import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.scss']
})
export class TablePostsComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'thumbnail_src',
    'location',
    'edge_media_to_caption',
    'taken_at_timestamp',
    'edge_media_preview_like',
    'edge_media_to_comment',
    'video_view_count',
    //'id',
    'shortcode',
    '__typename',
    //'owner',
    //'comments_disabled',
    'accessibility_caption'
  ];
  dataSource;
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('userPage').subscribe(({data}) => {

      this.dataSource = new MatTableDataSource(data.edge_owner_to_timeline_media.edges.map(post => ({
        ...post,
        location: post.location?.name,
        edge_media_preview_like: post.edge_media_preview_like.count,
        edge_media_to_comment: post.edge_media_to_comment.count,
        edge_media_to_caption: post.edge_media_to_caption.edges[0]?.node.text,
        taken_at_timestamp: new Date(post.taken_at_timestamp * 1000),
        owner: post.owner.username
      })));
      this.dataSource.sort = this.sort;
    });

  }

}
