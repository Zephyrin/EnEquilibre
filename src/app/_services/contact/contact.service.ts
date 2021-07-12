import { JSonLDHttpService } from './../jsonld/jsonld-http.service';
import { ContactHttpService } from './contact-http.service';
import { Injectable } from '@angular/core';
import { Contact } from '@app/_models';
import { CService } from '@app/_services/iservice';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ViewTranslateService } from '@app/_services/view-translate.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends CService<Contact> {
  constructor(
    private h: ContactHttpService,
    private j: JSonLDHttpService,
    private as: AuthenticationService,
    private v: ViewTranslateService) {
    super(h, j, as, v, Contact, Contact);
  }

  public hasContactOrComment(): boolean {
    return this.model
      && (this.model.contact || this.model.comment || this.model.email || this.edit);
  }
}
