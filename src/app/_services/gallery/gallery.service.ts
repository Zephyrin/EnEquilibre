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
  /* Column 1 for the home page */
  public c1: Gallery[];
  /* Column 2 for the home page
    If small screen, then this will be at the end. */
  public c2: Gallery[];
  public c3: Gallery[];
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
        this.c2 = [];
        this.c1 = [];
        this.c3 = [];
        this.values.forEach(elt => {
          if (this.c2.length < this.c1.length) { this.c2.push(elt); }
          else { this.c1.push(elt); }
        });
        if (this.c2.length < this.c1.length) {
          this.c3.push(this.c1[this.c1.length - 1]);
          this.c1.splice(this.c1.length - 1, 1);
        }
      }, err => {
        this.values = [];
      });
    } else {
      this.http.getAll().subscribe(response => {
        this.values = response.body.map(x => new Gallery(x));
        this.c1 = [];
        this.c2 = [];
        this.c3 = [];
        this.values.forEach(elt => {
          if (this.c2.length < this.c1.length) { this.c2.push(elt); }
          else { this.c1.push(elt); }
        });
        if (this.c2.length < this.c1.length) {
          this.c3.push(this.c1[this.c1.length - 1]);
          this.c1.splice(this.c1.length - 1, 1);
        }
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
      x => { this.currentUser = x; });
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

  public border(name: string, value: Gallery): boolean {
    if (value) {
      if (value[name]) {
        return false;
      }
    }
    return this.edit;
  }

  public has(name: string, value: Gallery): boolean {
    return value && (value[name] || this.edit);
  }

  public hasError(name: string, child: any): boolean {
    if (child) {
      if (child[name] && child[name].error === true) {
        return child[name].error;
      }
    }
  }

  public hasTitleOrSubtitle(child: any): boolean {
    return false;
  }

  public hasImage(name: string, value: any): boolean {
    return value && value[name];
  }

  public getUrl(name: string, value: Gallery): string {
    if (value) {
      if (value[name]) {
        return value[name].url();
      }
    }
    return '';
  }

  public getDescription(name: string, value: Gallery): string {
    if (value) {
      if (value[name]) {
        return value[name].description;
      }
    }
    return '';
  }

  public onError(name: string, child: any) {
    if (child) {
      if (child[name]) {
        child[name].onError();
      }
    }
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

  public delete(gallery: Gallery) {
    this.start();
    this.http.delete(gallery).subscribe(data => {
      let i = this.c1.indexOf(gallery);
      if (i >= 0) { this.c1.splice(i, 1); }
      i = this.c2.indexOf(gallery);
      if (i >= 0) { this.c2.splice(i, 1); }
      i = this.c3.indexOf(gallery);
      if (i >= 0) { this.c3.splice(i, 1); }
      i = this.values.indexOf(gallery);
      if (i >= 0) { this.values.splice(i, 1); }
      this.end();
    }, error => {
      this.end(error);
    });
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
