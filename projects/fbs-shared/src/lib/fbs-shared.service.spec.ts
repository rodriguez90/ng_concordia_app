import { TestBed } from '@angular/core/testing';

import { FbsSharedService } from './fbs-shared.service';

describe('FbsSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbsSharedService = TestBed.get(FbsSharedService);
    expect(service).toBeTruthy();
  });
});
