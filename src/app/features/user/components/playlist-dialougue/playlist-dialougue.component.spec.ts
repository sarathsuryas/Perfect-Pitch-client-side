import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDialougueComponent } from './playlist-dialougue.component';

describe('PlaylistDialougueComponent', () => {
  let component: PlaylistDialougueComponent;
  let fixture: ComponentFixture<PlaylistDialougueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistDialougueComponent]
    });
    fixture = TestBed.createComponent(PlaylistDialougueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
