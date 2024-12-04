import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAlbumsComponent } from './individual-albums.component';

describe('IndividualAlbumsComponent', () => {
  let component: IndividualAlbumsComponent;
  let fixture: ComponentFixture<IndividualAlbumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualAlbumsComponent]
    });
    fixture = TestBed.createComponent(IndividualAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
