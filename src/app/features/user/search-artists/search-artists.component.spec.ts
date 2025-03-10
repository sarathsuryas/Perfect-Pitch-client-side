import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArtistsComponent } from './search-artists.component';

describe('SearchArtistsComponent', () => {
  let component: SearchArtistsComponent;
  let fixture: ComponentFixture<SearchArtistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchArtistsComponent]
    });
    fixture = TestBed.createComponent(SearchArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
