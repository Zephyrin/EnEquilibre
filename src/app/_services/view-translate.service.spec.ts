import { TestBed } from '@angular/core/testing';

import { ViewTranslateService } from './view-translate.service';

describe('ViewTranslateService', () => {
  let service: ViewTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
