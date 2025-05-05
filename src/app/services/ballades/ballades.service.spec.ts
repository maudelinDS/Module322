import { TestBed } from '@angular/core/testing';

import { BalladesService } from './ballades.service';

describe('BalladesService', () => {
  let service: BalladesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalladesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
