import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideoPageComponent } from './live-video-page.component';

describe('LiveVideoPageComponent', () => {
  let component: LiveVideoPageComponent;
  let fixture: ComponentFixture<LiveVideoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveVideoPageComponent]
    });
    fixture = TestBed.createComponent(LiveVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
