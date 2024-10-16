import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksUploadListsComponent } from './tracks-upload-lists.component';

describe('TracksUploadListsComponent', () => {
  let component: TracksUploadListsComponent;
  let fixture: ComponentFixture<TracksUploadListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TracksUploadListsComponent]
    });
    fixture = TestBed.createComponent(TracksUploadListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
