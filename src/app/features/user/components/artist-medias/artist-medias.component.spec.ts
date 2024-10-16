import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistMediasComponent } from './artist-medias.component';

describe('ArtistMediasComponent', () => {
  let component: ArtistMediasComponent;
  let fixture: ComponentFixture<ArtistMediasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtistMediasComponent]
    });
    fixture = TestBed.createComponent(ArtistMediasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
