import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlaylistComponent } from './view-playlist.component';

describe('ViewPlaylistComponent', () => {
  let component: ViewPlaylistComponent;
  let fixture: ComponentFixture<ViewPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPlaylistComponent]
    });
    fixture = TestBed.createComponent(ViewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
