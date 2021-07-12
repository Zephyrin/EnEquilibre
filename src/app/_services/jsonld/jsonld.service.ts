import { JSonLD } from '@app/_models/jsonld';
import { JSonLDHttpService } from './jsonld-http.service';
import { Injectable } from '@angular/core';
import { CService } from '@app/_services/iservice';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ViewTranslateService } from '@app/_services/view-translate.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends CService<JSonLD> {
  constructor(
    private h: JSonLDHttpService,
    private as: AuthenticationService,
    private v: ViewTranslateService) {
    super(h, h, as, v, JSonLD, JSonLD);
  }
}
