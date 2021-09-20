import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import ReceptionistCabinetStoreService from './receptionist-cabinet.store.service';

describe('ReceptionistCabinetStoreService', () => {
  let service: ReceptionistCabinetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ReceptionistCabinetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
