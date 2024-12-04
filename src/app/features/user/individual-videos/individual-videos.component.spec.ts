import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualVideosComponent } from './individual-videos.component';

describe('IndividualVideosComponent', () => {
  let component: IndividualVideosComponent;
  let fixture: ComponentFixture<IndividualVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualVideosComponent]
    });
    fixture = TestBed.createComponent(IndividualVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
