import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSongsListComponent } from './album-songs-list.component';

describe('AlbumSongsListComponent', () => {
  let component: AlbumSongsListComponent;
  let fixture: ComponentFixture<AlbumSongsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumSongsListComponent]
    });
    fixture = TestBed.createComponent(AlbumSongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
