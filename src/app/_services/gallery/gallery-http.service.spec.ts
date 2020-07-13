import { TestBed } from '@angular/core/testing';

import { GalleryHttpService } from './gallery-http.service';

describe('GalleryHttpService', () => {
  let service: GalleryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
