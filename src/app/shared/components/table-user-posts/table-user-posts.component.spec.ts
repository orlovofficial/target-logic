import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableUserPostsComponent } from './table-user-posts.component';
import {MatTableModule} from '@angular/material/table';

describe('TableUserPostsComponent', () => {
  let component: TableUserPostsComponent;
  let fixture: ComponentFixture<TableUserPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUserPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableUserPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
