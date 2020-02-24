import { TestBed } from '@angular/core/testing';

import { CenterpointService } from './centerpoint.service';

describe('CenterpointService', () => {
  let service: CenterpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CenterpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
