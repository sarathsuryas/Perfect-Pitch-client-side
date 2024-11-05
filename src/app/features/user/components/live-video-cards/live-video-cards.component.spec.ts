import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideoCardsComponent } from './live-video-cards.component';

describe('LiveVideoCardsComponent', () => {
  let component: LiveVideoCardsComponent;
  let fixture: ComponentFixture<LiveVideoCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveVideoCardsComponent]
    });
    fixture = TestBed.createComponent(LiveVideoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
