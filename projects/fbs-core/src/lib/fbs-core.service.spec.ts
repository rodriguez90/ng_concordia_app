import { TestBed } from '@angular/core/testing';

import { FbsCoreService } from './fbs-core.service';

describe('FbsCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FbsCoreService = TestBed.get(FbsCoreService);
    expect(service).toBeTruthy();
  });
});
