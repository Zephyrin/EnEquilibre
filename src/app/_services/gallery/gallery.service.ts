import { ViewTranslateService } from './../view-translate.service';
import { FormErrors } from './../../_helpers/form-error';
import { Mediaobject } from './../../_models/mediaobject';
import { Role } from './../../_enums/role.enum';
import { User } from './../../_models/user';
import { AuthenticationService } from './../authentication.service';
import { GalleryHttpService } from './gallery-http.service';
import { Injectable } from '@angular/core';
import { Gallery } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  currentUser: User;
  public values: Gallery[];
  public selected: Gallery;
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
      this.http.getAllMerchant().subscribe(response => {
        this.values = response.body.map((x) => new Gallery(x));
      }, err => {
        this.values = [];
      });
    } else {
      this.http.getAll().subscribe(response => {
        this.values = response.body.map(x => new Gallery(x));
      }, err => {
        this.values = [];
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
    private http: GalleryHttpService,
    private authenticationService: AuthenticationService,
    private vt: ViewTranslateService) {
    this.edit = false;
    this.authenticationService.currentUser.subscribe(
      x => { this.currentUser = x; this.edit = true; });
  }

  public get(object: any, name: string): string {
    if (object) {
      if (object[name]) {
        return object[name];
      }
    }
    return this.edit ? this.vt.translate('no.' + name) : '';
  }

  public set(object: any, name: string, newValue: any): void {
    if (this.values) {
      this.values[name] = newValue;
    }
  }

  public border(value: Gallery, name: string): boolean {
    if (value) {
      if (value[name]) {
        return false;
      }
    }
    return this.edit;
  }

  public has(value: Gallery, name: string): boolean {
    return value && (value[name] || this.edit);
  }

  public getUrl(value: Gallery, name: string): string {
    if (value) {
      if (value[name]) {
        return value[name].url();
      }
    }
    return '';
  }

  public getDescription(value: Gallery, name: string): string {
    if (value) {
      if (value[name]) {
        return value[name].description;
      }
    }
    return '';
  }

  public update(value: Gallery, name: string, newValue: any): void {
    this.start();
    const gallery = new Gallery();
    if (name === 'medias') {
      const newValueArray: Mediaobject[] = [];
      value.medias.forEach(elt => {
        newValueArray.push(elt);
      });
      newValueArray.push(newValue);
      gallery.medias = newValueArray;
      this.updateOrCreate(value, name, newValueArray, gallery);
    } else {
      gallery[name] = newValue;
      this.updateOrCreate(value, name, newValue, gallery);
    }
  }

  public remove(gallery: Gallery, field: string, img: any = null): void {
    if (field === 'medias') {
      if (!gallery.medias) { return; }
      const newGallery = new Gallery();
      const index = gallery.medias.indexOf(img);
      if (index >= 0) {
        const newValue = [];
        gallery.medias.forEach(elt => {
          if (elt.id !== img.id) { newValue.push(elt); }
        });
        newGallery.medias = newValue;
        this.updateOrCreate(gallery, field, newValue, newGallery);
      }
    } else {
      this.update(gallery, field, null);
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

  public updateOrCreate(value: Gallery, field: string, newValue: any, object: Gallery) {
    if (value.id === undefined) {
      this.http.create(value).subscribe(data => {
        this.selected = new Gallery(data);
        this.values.push(this.selected);
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(value.id.toString(), object).subscribe(data => {
        value[field] = newValue;
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }

  orderUp(gallery: Gallery) {
    const index = this.values.indexOf(gallery);
    if (index > 0) {
      const previousGallery = this.values[index - 1];
      this.update(gallery, 'order', index - 1);
      this.update(previousGallery, 'order', index);
      this.values[index - 1] = gallery;
      this.values[index] = previousGallery;
    }
  }

  orderDown(gallery: Gallery) {
    const index = this.values.indexOf(gallery);
    if (index >= 0 && index < this.values.length - 1) {
      const nextGallery = this.values[index + 1];
      this.update(gallery, 'order', index + 1);
      this.update(nextGallery, 'order', index);
      this.values[index + 1] = gallery;
      this.values[index] = nextGallery;
    }
  }

  isFirst(gallery: Gallery) {
    if (this.values[0] === gallery) {
      return true;
    }
  }

  isLast(gallery: Gallery) {
    if (this.values[this.values.length - 1] === gallery) {
      return true;
    }
  }
}
