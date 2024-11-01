import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { memberShipGuard } from './member-ship.guard';

describe('memberShipGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => memberShipGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
