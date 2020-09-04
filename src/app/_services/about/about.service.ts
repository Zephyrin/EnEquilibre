import { ViewTranslateService } from '../view-translate.service';
import { FormErrors } from '../../_helpers/form-error';
import { Mediaobject } from '../../_models/mediaobject';
import { Role } from '../../_enums/role.enum';
import { User } from '../../_models/user';
import { AuthenticationService } from '../authentication.service';
import { AboutHttpService } from './about-http.service';
import { Injectable } from '@angular/core';
import { About } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  currentUser: User;
  public about: About;
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
        this.about = new About(data);
      }, err => {
        this.about = new About();
      });
    } else {
      this.http.get('').subscribe(data => {
        this.about = new About(data);
      }, err => {
        this.about = new About();
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
    private http: AboutHttpService,
    private authenticationService: AuthenticationService,
    private vt: ViewTranslateService) {
    this.edit = false;
    this.authenticationService.currentUser.subscribe(
      x => { this.currentUser = x; });
  }

  public getUrl(name: string): string {
    if (this.about) {
      if (this.about[name]) {
        return this.about[name].url();
      }
    }
    return '';
  }

  public getDescription(name: string): string {
    if (this.about) {
      if (this.about[name]) {
        return this.about[name].description;
      }
    }
    return '';
  }

  public get(object: any, name: string): string {
    if (this.about) {
      if (this.about[name]) {
        return this.about[name];
      }
    }
    return this.edit ? this.vt.translate('no.' + name) : '';
  }

  public set(object: any, name: string, newValue: any): void {
    if (this.about) {
      this.about[name] = newValue;
    }
  }

  public border(name: string): boolean {
    if (this.about) {
      if (this.about[name]) {
        return false;
      }
    }
    return this.edit;
  }

  public hasAboutOrComment(): boolean {
    return this.about && (this.about.about || this.about.comment || this.edit);
  }

  public hasImage(name: string): boolean {
    if (this.about && this.about[name]) { return true; }
    return this.edit;
  }

  public updateBackground(mediaObject: Mediaobject): void {
    this.start();
    const about = new About(this.about);
    about.background = mediaObject;
    this.updateOrCreate(about);
  }

  public updateSeparator(mediaObject: Mediaobject): void {
    this.start();
    const about = new About(this.about);
    about.separator = mediaObject;
    this.updateOrCreate(about);
  }

  public update(object: any, name: string, translate: any): void {
    this.start();
    const about = new About(this.about);
    about[name] = translate;
    this.updateOrCreate(about);
  }

  public removeBackground(): void {
    this.start();
    const about = new About(this.about);
    about.background = null;
    this.updateOrCreate(about);
  }
  public removeSeparator(): void {
    this.start();
    const about = new About(this.about);
    about.separator = null;
    this.updateOrCreate(about);
  }

  public remove(child: any, name: string, old: any): void {
    if (name === 'separator') { this.removeSeparator(); }
    if (name === 'background') { this.removeBackground(); }
  }

  public onError(name: string, child: any) {
    if (this.about && this.about[name]) {
      this.about[name].onError();
    }
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

  private updateOrCreate(about: About) {
    if (about.id === undefined) {
      this.http.create(about).subscribe(data => {
        this.about = new About(data);
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(about.id.toString(), about).subscribe(data => {
        this.about = new About(about);
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }
}
