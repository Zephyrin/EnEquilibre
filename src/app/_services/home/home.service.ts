import { HomeHttpService } from './home-http.service';
import { Injectable } from '@angular/core';
import { Home } from '@app/_models';
import { CService } from '@app/_services/iservice';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ViewTranslateService } from '@app/_services/view-translate.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService extends CService<Home>{
  constructor(
    private h: HomeHttpService,
    private as: AuthenticationService,
    private v: ViewTranslateService) {
    super(h, as, v, Home, Home);
  }

  public hasTitleOrSubtitle(): boolean {
    return this.model && (this.model.title || this.model.subtitle || this.edit);
  }
}
