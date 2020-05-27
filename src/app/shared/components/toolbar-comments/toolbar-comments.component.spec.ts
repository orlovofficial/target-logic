import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCommentsComponent } from './toolbar-comments.component';

describe('ToolbarCommentsComponent', () => {
  let component: ToolbarCommentsComponent;
  let fixture: ComponentFixture<ToolbarCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
