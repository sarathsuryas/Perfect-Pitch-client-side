import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isblockedGuard } from './isblocked.guard';

describe('isblockedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isblockedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
