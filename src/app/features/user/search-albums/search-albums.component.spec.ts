import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlbumsComponent } from './search-albums.component';

describe('SearchAlbumsComponent', () => {
  let component: SearchAlbumsComponent;
  let fixture: ComponentFixture<SearchAlbumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAlbumsComponent]
    });
    fixture = TestBed.createComponent(SearchAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
