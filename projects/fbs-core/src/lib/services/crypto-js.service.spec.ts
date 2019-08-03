import { TestBed } from '@angular/core/testing';

import { CryptoJsService } from './crypto-js.service';

describe('CryptoJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoJsService = TestBed.get(CryptoJsService);
    expect(service).toBeTruthy();
  });
});
