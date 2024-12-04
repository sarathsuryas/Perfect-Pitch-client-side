import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPlaylistsComponent } from './individual-playlists.component';

describe('IndividualPlaylistsComponent', () => {
  let component: IndividualPlaylistsComponent;
  let fixture: ComponentFixture<IndividualPlaylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualPlaylistsComponent]
    });
    fixture = TestBed.createComponent(IndividualPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
