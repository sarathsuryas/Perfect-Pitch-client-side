import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenresComponent } from './add-genres.component';

describe('AddGenresComponent', () => {
  let component: AddGenresComponent;
  let fixture: ComponentFixture<AddGenresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGenresComponent]
    });
    fixture = TestBed.createComponent(AddGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
