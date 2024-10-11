import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsPlayerComponent } from './shorts-player.component';

describe('ShortsPlayerComponent', () => {
  let component: ShortsPlayerComponent;
  let fixture: ComponentFixture<ShortsPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortsPlayerComponent]
    });
    fixture = TestBed.createComponent(ShortsPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
