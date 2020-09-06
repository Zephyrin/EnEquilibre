import { FormErrors } from '@app/_helpers/form-error';
import { AuthenticationService } from './authentication.service';
import { ViewTranslateService } from './view-translate.service';
import { HttpService } from '@app/_services/http.service';
import { Role } from '@app/_enums/role.enum';
import { Mediaobject, User } from '@app/_models';

export interface IService {
  edit: boolean;
  has(name: string, child: any | undefined): boolean;
  hasImage(name: string, child: any | undefined): boolean;

  hasError(name: string, child: any | undefined): boolean;

  hasTitleOrSubtitle(child: any | undefined): boolean;

  getUrl(name: string, child: any | undefined): string;

  getDescription(name: string, child: any | undefined): string;

  border(name: string, child: any | undefined): boolean;

  onError(name: string, child: any | undefined): void;

  get(object: any, name: string): string;
  set(object: any, name: string, newValue: any): void;

  removeBackground(): void;
  updateBackground(media: Mediaobject): void;

  update(object: any, name: string, mediaObject: Mediaobject): void;
  remove(object: any, name: string, old: any): void;
}

export abstract class CService<T> implements IService {
  currentUser: User;
  public model: T;
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
        this.model = new this.createCpy(data);
      }, err => {
        this.model = new this.create();
      });
    } else {
      this.http.get('').subscribe(data => {
        this.model = new this.createCpy(data);
      }, err => {
        this.model = new this.create();
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

  public constructor(
    private http: HttpService<T>,
    private authenticationService: AuthenticationService,
    private vt: ViewTranslateService,
    private createCpy: new (obj: any) => T,
    private create: new () => T
  ) {
    this.edit = false;
    this.authenticationService.currentUser.subscribe(
      x => { this.currentUser = x; });
  }

  public has(name: string, value: T | undefined): boolean {
    return value && (value[name] || this.edit);
  }

  public hasImage(name: string, child: T | undefined): boolean {
    if (this.model && this.model[name]) { return true; }
    return this.edit;
  }

  public hasError(name: string, child: T): boolean {
    if (child) {
      if (child[name] && child[name].error === true) {
        return child[name].error;
      }
    } else {
      if (this.model[name] && this.model[name].error === true) {
        return this.model[name].error;
      }
    }
    return false;
  }

  public hasTitleOrSubtitle(child: any): boolean {
    return false;
  }

  public getUrl(name: string, child: T | undefined): string {
    if (this.model) {
      if (this.model[name]) {
        return this.model[name].url();
      }
    }
    return '';
  }

  public getDescription(name: string, child: any | undefined): string {
    if (this.model) {
      if (this.model[name]) {
        return this.model[name].description;
      }
    }
    return '';
  }

  public border(name: string): boolean {
    if (this.model) {
      if (this.model[name]) {
        return false;
      }
    }
    return this.edit;
  }

  public onError(name: string, child: any) {
    if (child) {
      if (child[name]) {
        child[name].onError();
      }
    } else if (this.model[name]) {
      this.model[name].onError();
    }
  }

  public get(object: any, name: string): string {
    if (this.model) {
      if (this.model[name]) {
        return this.model[name];
      }
    }
    return this.edit ? this.vt.translate('no.' + name) : '';
  }

  public set(object: any, name: string, newValue: any): void {
    if (this.model) {
      this.model[name] = newValue;
    }
  }

  public removeBackground(): void {
    this.start();
    const about = new this.createCpy(this.model);
    const name = 'background';
    about[name] = null;
    this.updateOrCreate(about);
  }

  public updateBackground(mediaObject: Mediaobject): void {
    this.start();
    const model = new this.createCpy(this.model);
    const name = 'background';
    model[name] = mediaObject;
    this.updateOrCreate(model);
  }

  public removeSeparator(): void {
    this.start();
    const about = new this.createCpy(this.model);
    const name = 'separator';
    about[name] = null;
    this.updateOrCreate(about);
  }

  public updateSeparator(mediaObject: Mediaobject): void {
    this.start();
    const model = new this.createCpy(this.model);
    const name = 'separator';
    model[name] = mediaObject;
    this.updateOrCreate(model);
  }

  protected start() {
    this.loading = true;
    this.errors = new FormErrors();
  }

  protected end(error?: any | undefined) {
    this.loading = false;
    if (error) {
      this.errors.formatError(error);
    }
  }

  protected updateOrCreate(model: T) {
    const name = 'id';
    if (model[name] === undefined) {
      this.http.create(model).subscribe(data => {
        this.model = new this.createCpy(data);
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(model[name].toString(), model).subscribe(data => {
        this.model = new this.createCpy(model);
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }

  public update(object: any, name: string, translate: any): void {
    this.start();
    const model = new this.createCpy(this.model);
    model[name] = translate;
    this.updateOrCreate(model);
  }

  public remove(child: any, name: string, old: any): void {
    if (name === 'separator') { this.removeSeparator(); }
    if (name === 'background') { this.removeBackground(); }
  }
}
