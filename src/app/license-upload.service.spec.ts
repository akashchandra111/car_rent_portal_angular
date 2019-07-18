import { TestBed } from '@angular/core/testing';

import { LicenseUploadService } from './license-upload.service';

describe('LicenseUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LicenseUploadService = TestBed.get(LicenseUploadService);
    expect(service).toBeTruthy();
  });
});
