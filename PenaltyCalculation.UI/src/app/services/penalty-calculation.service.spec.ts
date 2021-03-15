import { TestBed } from '@angular/core/testing';

import { PenaltyCalculationService } from './penalty-calculation.service';

describe('PenaltyCalculationService', () => {
  let service: PenaltyCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenaltyCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
