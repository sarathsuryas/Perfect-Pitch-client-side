import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAudioUploadComponent } from './multiple-audio-upload.component';

describe('MultipleAudioUploadComponent', () => {
  let component: MultipleAudioUploadComponent;
  let fixture: ComponentFixture<MultipleAudioUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleAudioUploadComponent]
    });
    fixture = TestBed.createComponent(MultipleAudioUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
