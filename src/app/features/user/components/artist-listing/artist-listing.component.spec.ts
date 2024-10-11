import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListingComponent } from './artist-listing.component';

describe('ArtistListingComponent', () => {
  let component: ArtistListingComponent;
  let fixture: ComponentFixture<ArtistListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistListingComponent]
    });
    fixture = TestBed.createComponent(ArtistListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
