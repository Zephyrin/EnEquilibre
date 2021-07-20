import { AboutHttpService } from './about-http.service';
import { Injectable } from '@angular/core';
import { About } from '@app/_models';
import { CService } from '@app/_services/iservice';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { JSonLDHttpService } from '../jsonld/jsonld-http.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService extends CService<About> {
  public about: About;

  constructor(
    private h: AboutHttpService,
    private j: JSonLDHttpService,
    private as: AuthenticationService,
    private v: ViewTranslateService) {
    super(h, j, as, v, About, About, 'about');
  }

  public hasAboutOrComment(): boolean {
    return this.about && (this.about.about || this.about.comment || this.edit);
  }
}
