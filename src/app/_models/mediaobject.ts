import { environment } from '@environments/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Mediaobject {
  id: number;
  description: any;
  filePath: string;
  protected img: SafeResourceUrl;
  translations: any;
  error = false;
  get image(): SafeResourceUrl {
    return this.img;
  }
  set image(image: SafeResourceUrl) {
    this.img = image;
    this.timeStamp = (new Date()).getTime();
  }
  public timeStamp: number;

  constructor(mediaobject: Mediaobject = null) {
    if (mediaobject !== null && mediaobject !== undefined) {
      this.id = mediaobject.id;
      this.description = mediaobject.description;
      this.filePath = mediaobject.filePath;
      this.image = mediaobject.image;
      this.timeStamp = mediaobject.timeStamp;
      this.translations = mediaobject.translations;
      this.error = mediaobject.error ? true : false;
    } else {
      this.timeStamp = (new Date()).getTime();
    }
  }

  public url(width: number): string {
    if (width === undefined) {
      throw new Error('Width undefined');
    }
    let w$ = 'w_';
    if (width < 1001 && width > 900) { w$ += '1000_'; }
    else if (width < 901 && width > 800) { w$ += '900_'; }
    else if (width < 801 && width > 700) { w$ += '800_'; }
    else if (width < 701 && width > 600) { w$ += '700_'; }
    else if (width < 601 && width > 500) { w$ += '600_'; }
    else if (width < 501 && width > 400) { w$ += '500_'; }
    else if (width < 401 && width > 300) { w$ += '400_'; }
    else if (width < 301 && width > 200) { w$ += '300_'; }
    else if (width < 201 && width > 100) { w$ += '200_'; }
    else if (width < 101) { w$ += '100_'; }
    if (this.timeStamp) {
      return `${environment.mediaUrl}/${w$}${this.filePath}` + '?' + this.timeStamp;
    }
    return `${environment.mediaUrl}/${w$}${this.filePath}`;
  }

  public hasUrl(): boolean {
    return this.filePath !== undefined;
  }

  public update(mediaobject: Mediaobject) {
    if (mediaobject !== null && mediaobject !== undefined) {
      this.id = mediaobject.id;
      this.description = mediaobject.description;
      this.filePath = mediaobject.filePath;
      this.image = mediaobject.image;
      this.timeStamp = (new Date()).getTime();
    } else {
      this.timeStamp = (new Date()).getTime();
    }
  }

  public onError() {
    this.error = true;
  }

  toJSON(addId = false) {
    const data = {};
    if (this.id && addId) { data[`id`] = this.id; }
    if (this.img) { data[`image`] = this.img; }
    if (this.description) { data[`description`] = this.description; }
    return data;
  }
}
