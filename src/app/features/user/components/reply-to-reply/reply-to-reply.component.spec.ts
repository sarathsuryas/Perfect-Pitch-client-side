import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyToReplyComponent } from './reply-to-reply.component';

describe('ReplyToReplyComponent', () => {
  let component: ReplyToReplyComponent;
  let fixture: ComponentFixture<ReplyToReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyToReplyComponent]
    });
    fixture = TestBed.createComponent(ReplyToReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
