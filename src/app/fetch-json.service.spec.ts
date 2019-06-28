import { TestBed } from '@angular/core/testing';

import { FetchJSONService } from './fetch-json.service';

describe('FetchJSONService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchJSONService = TestBed.get(FetchJSONService);
    expect(service).toBeTruthy();
  });
});
