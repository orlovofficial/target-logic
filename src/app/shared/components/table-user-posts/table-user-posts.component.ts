import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: 'app-table-user-posts',
  templateUrl: './table-user-posts.component.html',
  styleUrls: ['./table-user-posts.component.scss']
})
export class TableUserPostsComponent implements OnInit {

  @Input() postsList: any;

  displayedColumns: string[] = [
    'select',
    'thumbnail_src',
    'location',
    'edge_media_to_caption',
    'taken_at_timestamp',
    'edge_media_preview_like',
    'edge_media_to_comment',
    'video_view_count',
    'id',
    'shortcode',
    '__typename',
    'owner',
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

  constructor() { }

  ngOnInit(): void {
    console.log(this.postsList);
    this.dataSource = new MatTableDataSource(this.postsList);
    this.dataSource.sort = this.sort;
    //this.postsList.forEach(e => {e.node.taken_at_timestamp = new Date(e.node.taken_at_timestamp * 1000)});
  }

}
