import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import EmployeeCredentialApiService from './employee-credential-api.service';

describe('EmployeeCredentialApiService', () => {
  let service: EmployeeCredentialApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeCredentialApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
