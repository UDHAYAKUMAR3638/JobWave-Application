import { TestBed } from '@angular/core/testing';

import { ViewCompanyService } from './view-company.service';

describe('ViewCompanyService', () => {
  let service: ViewCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
