import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCommentsComponent } from './table-comments.component';
import { MatTableModule } from '@angular/material/table';

describe('TableUserPostsComponent', () => {
  let component: TableCommentsComponent;
  let fixture: ComponentFixture<TableCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
