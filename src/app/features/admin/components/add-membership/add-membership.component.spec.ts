import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembershipComponent } from './add-membership.component';

describe('AddMembershipComponent', () => {
  let component: AddMembershipComponent;
  let fixture: ComponentFixture<AddMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMembershipComponent]
    });
    fixture = TestBed.createComponent(AddMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
