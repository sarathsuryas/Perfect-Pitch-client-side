import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAudioUploadComponent } from './single-audio-upload.component';

describe('SingleAudioUploadComponent', () => {
  let component: SingleAudioUploadComponent;
  let fixture: ComponentFixture<SingleAudioUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleAudioUploadComponent]
    });
    fixture = TestBed.createComponent(SingleAudioUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
