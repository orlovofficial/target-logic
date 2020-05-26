import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TablePostsComponent } from './table-posts.component';
import {MatTableModule} from '@angular/material/table';

describe('TableUserPostsComponent', () => {
  let component: TablePostsComponent;
  let fixture: ComponentFixture<TablePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablePostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
