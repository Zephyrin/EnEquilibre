import { FormErrors } from './../../_helpers/form-error';
import { ViewTranslateService } from './../view-translate.service';
import { MediaobjectHttpService } from './mediaobject-http.service';
import { Mediaobject } from './../../_models/mediaobject';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaobjectService {
  medias: Mediaobject[];
  selectedImg: Mediaobject;
  loading = false;
  errors = new FormErrors();
  edit = true;
  /* List for the first column of the display */
  m1: Mediaobject[];
  /* List for the second column of the display */
  m2: Mediaobject[];
  m3: Mediaobject[];
  m4: Mediaobject[];
  constructor(private http: MediaobjectHttpService, private vt: ViewTranslateService) {
    this.http.getAllMerchant(null).subscribe(response => {
      this.medias = response.body.map((x) => new Mediaobject(x));
      this.m1 = [];
      this.m2 = [];
      this.m3 = [];
      this.m4 = [];
      this.medias.forEach(elt => {
        this.push(elt);
      });
    });
  }

  private push(media: Mediaobject) {
    if (this.m4.length < this.m3.length) {
      this.m4.push(media);
    } else if (this.m3.length < this.m2.length) {
      this.m3.push(media);
    } else if (this.m2.length < this.m1.length) {
      this.m2.push(media);
    } else {
      this.m1.push(media);
    }
  }

  public selectImg(img: Mediaobject): void {
    if (this.selectedImg && this.selectedImg.id === img.id) {
      this.selectedImg = undefined;
    } else {
      this.selectedImg = img;
    }
  }

  public getTranslations(img: Mediaobject): string {
    const trans = img.translations;
    if (trans[this.vt.language]) {
      if (trans[this.vt.language].description
        || trans[this.vt.language].description === '') {
        return trans[this.vt.language].description;
      }
    }
    const val = img.description;
    if (val[this.vt.language] || val[this.vt.language] === '') {
      return val[this.vt.language];
    }
    return val;
  }

  public hasTranslation(img: Mediaobject): boolean {
    const trans = img.translations;
    if (trans[this.vt.language]) {
      if (trans[this.vt.language].description
        && trans[this.vt.language].description !== '') {
        return true;
      }
    }
    const val = img.description;
    if (val[this.vt.language] && val[this.vt.language] !== '') {
      return true;
    }
    return false;
  }

  public get(object: any, name: string): string {
    if (object) {
      if (object[name] && object[name] !== '') {
        return object[name];
      }
    }
    return this.vt.translate('no.' + name);
  }

  public set(object: any, name: string, newValue: any): void {
    if (object) {
      object[name] = newValue;
    }
  }

  public update(object: any, name: string, newValue: any): void {
    this.start();
    const mediaObject = new Mediaobject(object);
    mediaObject[name] = newValue;
    this.updateOrCreate(mediaObject, object, name, newValue);
  }

  private updateOrCreate(newM: Mediaobject, oldM: Mediaobject, name: string, newValue: any) {
    if (newM.id === undefined) {
      this.http.create(newM).subscribe(data => {
        const elt = new Mediaobject(data);
        this.medias.push(elt);
        this.push(elt);
        this.end();
      }, error => {
        this.end(error);
      });
    } else {
      this.http.update(newM.id.toString(), newM).subscribe(data => {
        oldM[name] = newValue;
        this.end();
      }, error => {
        this.end(error);
      });
    }
  }

  public delete(img: Mediaobject): void {
    this.start();
    this.http.delete(img).subscribe(data => {
      this._delete(img);
    }, error => {
      if (error.status === 404) { this._delete(img); }
      else { this.end(error); }
    });
  }

  private _delete(img: Mediaobject) {
    let i = this.medias.indexOf(img);
    if (i >= 0) { this.medias.splice(i, 1); }
    i = this.m1.indexOf(img);
    if (i >= 0) { this.m1.splice(i, 1); }
    i = this.m2.indexOf(img);
    if (i >= 0) { this.m2.splice(i, 1); }
    i = this.m3.indexOf(img);
    if (i >= 0) { this.m3.splice(i, 1); }
    i = this.m4.indexOf(img);
    if (i >= 0) { this.m4.splice(i, 1); }
    this.end();
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
}
