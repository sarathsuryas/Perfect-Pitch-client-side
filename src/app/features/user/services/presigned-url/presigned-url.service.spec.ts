import { TestBed } from '@angular/core/testing';

import { PresignedUrlService } from './presigned-url.service';

describe('PresignedUrlService', () => {
  let service: PresignedUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresignedUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
