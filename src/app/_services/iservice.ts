import { FormErrors } from '@app/_helpers/form-error';
import { AuthenticationService } from './authentication.service';
import { ViewTranslateService } from './view-translate.service';
import { HttpService } from '@app/_services/http.service';
import { Role } from '@app/_enums/role.enum';
import { Mediaobject, User } from '@app/_models';
import { JSonLD } from '@app/_models/jsonld';
import { Subject } from 'rxjs';

export interface IService {
  edit: boolean;
  canEdit: boolean;
  loading: boolean;
  jsonLD: JSonLD;
  vt: ViewTranslateService;
  /**
   * Permet de dire à l'interface que la création, mise à jour ou la suppression est terminée
   * et qu'il peut mettre à jour la vue.
   * Si le boolean est true alors tout va bien. sinon il y a eu une erreur.
   */
  endUpdate: Subject<boolean>;
  has(name: string, child: any | undefined): boolean;
  hasImage(name: string, child: any | undefined): boolean;

  hasError(name: string, child: any | undefined): boolean;

  hasTitleOrSubtitle(child: any | undefined): boolean;

  getUrl(name: string, width: number, child: any | undefined): string;
  hasUrl(name: string, child: any | undefined): boolean;

  getDescription(name: string, child: any | undefined): string;

  border(name: string, child: any | undefined): boolean;

  onError(name: string, child: any | undefined): void;

  get(object: any, name: string): string;
  set(object: any, name: string, newValue: any): void;

  removeBackground(): void;
  updateBackground(media: Mediaobject): void;

  update(object: any, name: string, mediaObject: Mediaobject): void;
  remove(object: any, name: string, old: any): void;

  initJSonLD();
  createOrUpdateJSonLD(json: JSonLD);
}

export abstract class CService<T> implements IService {
  protected currentUser: User;
  public model: T;
  public loading = false;
  public errors = new FormErrors();
  public endUpdate = new Subject<boolean>();
  public jsonLD = new JSonLD();

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
    this.loading = true;
    if (this.edit$) {

      this.http.getMerchant('').subscribe(data => {
        this.model = new this.createCpy(data);
        this.loading = false;
      }, err => {
        this.model = new this.create();
        this.loading = false;
      });
    } else {
      this.http.get('').subscribe(data => {
        this.model = new this.createCpy(data);
        this.loading = false;
      }, err => {
        this.model = new this.create();
        this.loading = false;
      });
    }
  }
  public get edit() { return this.edit$; }
  protected edit$ = false;

  public get canEdit() {
    return this.currentUser
      && this.currentUser.roles
      && (this.currentUser.roles.indexOf(Role.Merchant) !== -1
        || this.currentUser.roles.indexOf(Role.Admin) !== -1
        || this.currentUser.roles.indexOf(Role.SuperAdmin) !== -1);
  }

  public constructor(
    protected http: HttpService<T>,
    protected httpJSonLD: HttpService<JSonLD>,
    protected authenticationService: AuthenticationService,
    public vt: ViewTranslateService,
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

  public hasUrl(name: string, child: T | undefined): boolean {
    if (child) { return child[name] !== undefined && child[name].hasUrl(); }
    return this.model[name] !== undefined && this.model[name].hasUrl();
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

  public getUrl(name: string, width: number, child: T | undefined): string {
    if (this.model) {
      if (this.model[name]) {
        return this.model[name].url(width);
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

  public border(name: string, child: T | undefined): boolean {
    if (this.model) {
      if (this.model[name] === undefined) {
        return false;
      } else if (this.model[name].error === true) {
        return true;
      }
    }
    return this.edit;
  }

  public onError(name: string, child: any | undefined) {
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
      this.endUpdate.next(false);
      this.errors.formatError(error);
    } else {
      this.endUpdate.next(true);
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

  public initJSonLD(): void {
    if (this.jsonLD.id === '') {
      this.httpJSonLD.get(this.constructor.name.replace('Service', '')).subscribe(data => {
        this.jsonLD = new JSonLD(data);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = this.jsonLD.json;
        document.head.appendChild(script);
      }, error => {
        this.jsonLD = new JSonLD();
      });
    }
  }

  public createOrUpdateJSonLD(jsonLD: JSonLD): void {
    this.start();
    if (jsonLD.id === '') {
      const name = this.constructor.name.replace('Service', '');
      const json = new JSonLD(jsonLD);
      json.id = name;
      this.httpJSonLD.create(json).subscribe(data => {
        this.jsonLD.id = name;
        this.jsonLD.json = jsonLD.json;
        jsonLD.id = name;
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.httpJSonLD.update(jsonLD.id, jsonLD).subscribe(data => {
        this.jsonLD.json = jsonLD.json;
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }
}
