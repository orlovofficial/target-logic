import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: 'app-table-posts',
  templateUrl: './table-posts.component.html',
  styleUrls: ['./table-posts.component.scss']
})
export class TablePostsComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {

    this.dataSource = new MatTableDataSource(this.postsList.map(p => {
      const post = {
        thumbnail_src: p.node.thumbnail_resources[0].src,
        location: p.node.location?.name,
        edge_media_to_caption: p.node.edge_media_to_caption.edges[0]?.node.text,
        taken_at_timestamp: new Date(p.node.taken_at_timestamp * 1000),
        edge_media_preview_like: p.node.edge_media_preview_like.count,
        edge_media_to_comment: p.node.edge_media_to_comment.count,
        video_view_count: p.node.video_view_count,
        id: p.node.id,
        shortcode: p.node.shortcode,
        __typename: p.node.__typename.slice(5),
        owner: p.node.owner.username,
        comments_disabled: p.node.comments_disabled,
        accessibility_caption: p.node.accessibility_caption
      };
      return post;
    }));
    this.dataSource.sort = this.sort;
  }

}
