import { TestBed } from '@angular/core/testing';

import { AppInjectorService } from './app-injector.service';

describe('AppInjectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppInjectorService = TestBed.get(AppInjectorService);
    expect(service).toBeTruthy();
  });
});
