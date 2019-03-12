import { TestBed, inject } from '@angular/core/testing';

import { StorageAzureService } from './storage-azure.service';

describe('StorageAzureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageAzureService]
    });
  });

  it('should be created', inject([StorageAzureService], (service: StorageAzureService) => {
    expect(service).toBeTruthy();
  }));
});
