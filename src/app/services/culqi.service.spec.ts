import { TestBed } from '@angular/core/testing';

import { CulqiService } from './culqi.service';

describe('CulqiService', () => {
  let service: CulqiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulqiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
