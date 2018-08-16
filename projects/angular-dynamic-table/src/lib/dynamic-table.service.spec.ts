import { TestBed, inject } from '@angular/core/testing';

import { DynamicTableService } from './dynamic-table.service';

describe('DynamicTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicTableService]
    });
  });

  it('should be created', inject([DynamicTableService], (service: DynamicTableService) => {
    expect(service).toBeTruthy();
  }));
});
