import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardsComponent } from './playlist-cards.component';

describe('PlaylistCardsComponent', () => {
  let component: PlaylistCardsComponent;
  let fixture: ComponentFixture<PlaylistCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistCardsComponent]
    });
    fixture = TestBed.createComponent(PlaylistCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
