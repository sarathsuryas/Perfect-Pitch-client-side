import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideosListingComponent } from './live-videos-listing.component';

describe('LiveVideosListingComponent', () => {
  let component: LiveVideosListingComponent;
  let fixture: ComponentFixture<LiveVideosListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveVideosListingComponent]
    });
    fixture = TestBed.createComponent(LiveVideosListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
