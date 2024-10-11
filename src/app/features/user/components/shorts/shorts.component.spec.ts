import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsComponent } from './shorts.component';

describe('ShortsComponent', () => {
  let component: ShortsComponent;
  let fixture: ComponentFixture<ShortsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortsComponent]
    });
    fixture = TestBed.createComponent(ShortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
