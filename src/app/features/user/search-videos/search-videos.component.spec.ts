import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVideosComponent } from './search-videos.component';

describe('SearchVideosComponent', () => {
  let component: SearchVideosComponent;
  let fixture: ComponentFixture<SearchVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchVideosComponent]
    });
    fixture = TestBed.createComponent(SearchVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
