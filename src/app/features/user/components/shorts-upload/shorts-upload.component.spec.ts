import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortsUploadComponent } from './shorts-upload.component';

describe('ShortsUploadComponent', () => {
  let component: ShortsUploadComponent;
  let fixture: ComponentFixture<ShortsUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShortsUploadComponent]
    });
    fixture = TestBed.createComponent(ShortsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
