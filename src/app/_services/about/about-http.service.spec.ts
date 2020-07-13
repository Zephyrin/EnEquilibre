import { TestBed } from '@angular/core/testing';

import { AboutHttpService } from './about-http.service';

describe('AboutHttpService', () => {
  let service: AboutHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
