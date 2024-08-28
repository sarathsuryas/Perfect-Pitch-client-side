import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResetPasswordFormComponent } from './user-reset-password-form.component';

describe('UserResetPasswordFormComponent', () => {
  let component: UserResetPasswordFormComponent;
  let fixture: ComponentFixture<UserResetPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserResetPasswordFormComponent]
    });
    fixture = TestBed.createComponent(UserResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
