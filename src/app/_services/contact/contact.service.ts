import { ViewTranslateService } from '../view-translate.service';
import { FormErrors } from '../../_helpers/form-error';
import { Mediaobject } from '../../_models/mediaobject';
import { Role } from '../../_enums/role.enum';
import { User } from '../../_models/user';
import { AuthenticationService } from '../authentication.service';
import { ContactHttpService } from './contact-http.service';
import { Injectable } from '@angular/core';
import { Contact } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  currentUser: User;
  public contact: Contact;
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
        this.contact = new Contact(data);
      }, err => {
        this.contact = new Contact();
      });
    } else {
      this.http.get('').subscribe(data => {
        this.contact = new Contact(data);
      }, err => {
        this.contact = new Contact();
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
    private http: ContactHttpService,
    private authenticationService: AuthenticationService,
    private vt: ViewTranslateService) {
    this.edit = false;
    this.authenticationService.currentUser.subscribe(
      x => { this.currentUser = x; });
  }

  public getUrl(name: string): string {
    if (this.contact) {
      if (this.contact[name]) {
        return this.contact[name].url();
      }
    }
    return '';
  }

  public getDescription(name: string): string {
    if (this.contact) {
      if (this.contact[name]) {
        return this.contact[name].description;
      }
    }
    return '';
  }

  public get(object: any, name: string): string {
    if (this.contact) {
      if (this.contact[name]) {
        return this.contact[name];
      }
    }
    return this.edit ? this.vt.translate('no.' + name) : '';
  }

  public set(object: any, name: string, newValue: any): void {
    if (this.contact) {
      this.contact[name] = newValue;
    }
  }

  public border(name: string): boolean {
    if (this.contact) {
      if (this.contact[name]) {
        return false;
      }
    }
    return this.edit;
  }

  public hasContactOrComment(): boolean {
    return this.contact
      && (this.contact.contact || this.contact.comment || this.contact.email || this.edit);
  }

  public hasImage(name: string): boolean {
    if (this.contact && this.contact[name]) { return true; }
    return this.edit;
  }

  public updateBackground(mediaObject: Mediaobject): void {
    this.start();
    const contact = new Contact(this.contact);
    contact.background = mediaObject;
    this.updateOrCreate(contact);
  }

  public updateSeparator(mediaObject: Mediaobject): void {
    this.start();
    const contact = new Contact(this.contact);
    contact.separator = mediaObject;
    this.updateOrCreate(contact);
  }

  public update(object: any, name: string, translate: any): void {
    this.start();
    const contact = new Contact(this.contact);
    contact[name] = translate;
    this.updateOrCreate(contact);
  }

  public removeBackground(): void {
    this.start();
    const contact = new Contact(this.contact);
    contact.background = null;
    this.updateOrCreate(contact);
  }
  public removeSeparator(): void {
    this.start();
    const contact = new Contact(this.contact);
    contact.separator = null;
    this.updateOrCreate(contact);
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

  private updateOrCreate(contact: Contact) {
    if (contact.id === undefined) {
      this.http.create(contact).subscribe(data => {
        this.contact = new Contact(data);
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(contact.id.toString(), contact).subscribe(data => {
        this.contact = new Contact(contact);
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }
}
