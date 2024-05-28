import { TestBed } from '@angular/core/testing';

import { SubmitAssignmentService } from './submit-assignment.service';

describe('SubmitAssignmentService', () => {
  let service: SubmitAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
