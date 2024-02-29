import { TestBed } from '@angular/core/testing';

import { BillsPageService } from './bills-page.service';

describe('BillsPageService', () => {
  let service: BillsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
