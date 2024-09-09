import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioUploadDialogComponent } from './audio-upload-dialog.component';

describe('AudioUploadDialogComponent', () => {
  let component: AudioUploadDialogComponent;
  let fixture: ComponentFixture<AudioUploadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioUploadDialogComponent]
    });
    fixture = TestBed.createComponent(AudioUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
