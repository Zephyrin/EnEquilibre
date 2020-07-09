import { ViewTranslateService } from './../view-translate.service';
import { FormErrors } from './../../_helpers/form-error';
import { Mediaobject } from './../../_models/mediaobject';
import { Role } from './../../_enums/role.enum';
import { User } from './../../_models/user';
import { AuthenticationService } from './../authentication.service';
import { HomeHttpService } from './home-http.service';
import { Injectable } from '@angular/core';
import { Home } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  currentUser: User;
  public home: Home;
  public loading = false;
  public errors = new FormErrors();
  public set edit(edit: boolean) {
    if (edit) {
      if (!(this.currentUser
        && this.currentUser.roles
        && (this.currentUser.roles.indexOf(Role.Merchant) !== -1
          || this.currentUser.roles.indexOf(Role.Admin) !== -1
          || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1))) {
        return;
      }
    }
    this.edit$ = edit;
    if (this.edit$) {
      this.http.getMerchant('').subscribe(data => {
        this.home = new Home(data);
      }, err => {
        this.home = new Home();
      });
    } else {
      this.http.get('').subscribe(data => {
        this.home = new Home(data);
      }, err => {
        this.home = new Home();
      });
    }
  }
  public get edit() { return this.edit$; }
  private edit$ = false;

  public get canEdit() {
    return this.currentUser
      && this.currentUser.roles
      && (this.currentUser.roles.indexOf(Role.Merchant) !== -1
        || this.currentUser.roles.indexOf(Role.Admin) !== -1
        || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1);
  }

  constructor(
    private http: HomeHttpService,
    private authenticationService: AuthenticationService,
    private vt: ViewTranslateService) {
    this.edit = false;
    this.authenticationService.currentUser.subscribe(
      x => { this.currentUser = x; this.edit = true; });
  }

  public getUrl(name: string): string {
    if (this.home) {
      if (this.home[name]) {
        return this.home[name].url();
      }
    }
    return '';
  }

  public getDescription(name: string): string {
    if (this.home) {
      if (this.home[name]) {
        return this.home[name].description;
      }
    }
    return '';
  }

  public get(name: string): string {
    if (this.home) {
      if (this.home[name]) {
        return this.home[name];
      }
    }
    return this.edit ? this.vt.translate('no.' + name) : '';
  }

  public border(name: string): boolean {
    if (this.home) {
      if (this.home[name]) {
        return false;
      }
    }
    return this.edit;
  }

  public hasTitleOrSubtitle(): boolean {
    return this.home && (this.home.title || this.home.subtitle || this.edit);
  }

  public hasImage(name: string): boolean {
    if (this.home && this.home[name]) { return true; }
    return this.edit;
  }

  public updateBackground(mediaObject: Mediaobject): void {
    this.start();
    const home = new Home(this.home);
    home.background = mediaObject;
    this.updateOrCreate(home);
  }

  public updateSeparator(mediaObject: Mediaobject): void {
    this.start();
    const home = new Home(this.home);
    home.separator = mediaObject;
    this.updateOrCreate(home);
  }

  public update(name: string, translate: any): void {
    this.start();
    const home = new Home(this.home);
    home[name] = translate;
    this.updateOrCreate(home);
  }

  public removeBackground(): void {
    this.start();
    const home = new Home(this.home);
    home.background = undefined;
    this.updateOrCreate(home);
  }
  public removeSeparator(): void {
    this.start();
    const home = new Home(this.home);
    home.separator = undefined;
    this.updateOrCreate(home);
  }

  private start() {
    this.loading = true;
    this.errors = new FormErrors();
  }

  private end(error?: any | undefined) {
    this.loading = false;
    if (error) {
      this.errors.formatError(error);
    }
  }

  private updateOrCreate(home: Home) {
    if (home.id === undefined) {
      this.http.create(home).subscribe(data => {
        this.home = new Home(data);
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(home).subscribe(data => {
        this.home = new Home(home);
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }
}
