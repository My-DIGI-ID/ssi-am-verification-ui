import { TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';

import NgswService from './ngsw.service';

describe('NgswService', () => {
  let service: NgswService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })],
    });
    service = TestBed.inject(NgswService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
