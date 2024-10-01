import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRepliesComponent } from './comment-replies.component';

describe('CommentRepliesComponent', () => {
  let component: CommentRepliesComponent;
  let fixture: ComponentFixture<CommentRepliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentRepliesComponent]
    });
    fixture = TestBed.createComponent(CommentRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
