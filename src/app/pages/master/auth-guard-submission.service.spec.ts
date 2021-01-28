import { TestBed } from '@angular/core/testing';

import { AuthGuardSubmissionService } from './auth-guard-submission.service';

describe('AuthGuardSubmissionService', () => {
  let service: AuthGuardSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
