import { TestBed } from '@angular/core/testing';

import { CategoryPAService } from './category-pa.service';

describe('CategoryPAService', () => {
  let service: CategoryPAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryPAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
