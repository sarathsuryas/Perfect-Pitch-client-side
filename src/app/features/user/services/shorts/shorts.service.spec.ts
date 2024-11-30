import { TestBed } from '@angular/core/testing';

import { ShortsService } from './shorts.service';

describe('ShortsService', () => {
  let service: ShortsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
