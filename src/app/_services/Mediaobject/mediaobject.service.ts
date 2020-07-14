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
  constructor(private http: MediaobjectHttpService, private vt: ViewTranslateService) {
    this.http.getAllMerchant(null).subscribe(response => {
      this.medias = response.body.map((x) => new Mediaobject(x));

    });
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
      if (trans[this.vt.language].description) {
        return trans[this.vt.language].description;
      }
    }
    const val = img.description;
    if (val[this.vt.language]) {
      return val[this.vt.language];
    }
    return val;
  }

  public get(object: any, name: string): string {
    if (object) {
      if (object[name]) {
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
        //TODO
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
    const i = this.medias.indexOf(img);
    if (i >= 0) {
      this.medias.splice(i, 1);
    }
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
