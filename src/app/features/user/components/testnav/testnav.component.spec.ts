import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestnavComponent } from './testnav.component';

describe('TestnavComponent', () => {
  let component: TestnavComponent;
  let fixture: ComponentFixture<TestnavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestnavComponent]
    });
    fixture = TestBed.createComponent(TestnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
