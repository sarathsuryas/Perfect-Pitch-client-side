import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetPasswordFormComponent } from './admin-reset-password-form.component';

describe('AdminResetPasswordFormComponent', () => {
  let component: AdminResetPasswordFormComponent;
  let fixture: ComponentFixture<AdminResetPasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminResetPasswordFormComponent]
    });
    fixture = TestBed.createComponent(AdminResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
