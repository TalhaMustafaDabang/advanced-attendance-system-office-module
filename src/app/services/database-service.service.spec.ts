import { TestBed, inject } from '@angular/core/testing';

import { DatabaseServiceService } from './database-service.service';

describe('DatabaseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseServiceService]
    });
  });

  it('should be created', inject([DatabaseServiceService], (service: DatabaseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
