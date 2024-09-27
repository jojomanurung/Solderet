import { TestBed } from '@angular/core/testing';

import { SortChartService } from './sort-chart.service';

describe('SortChartService', () => {
  let service: SortChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
