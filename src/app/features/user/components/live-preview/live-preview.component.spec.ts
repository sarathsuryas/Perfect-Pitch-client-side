import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePreviewComponent } from './live-preview.component';

describe('LivePreviewComponent', () => {
  let component: LivePreviewComponent;
  let fixture: ComponentFixture<LivePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivePreviewComponent]
    });
    fixture = TestBed.createComponent(LivePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
