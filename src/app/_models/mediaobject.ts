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

  public url(): string {
    if (this.timeStamp) {
      return `${environment.mediaUrl}/${this.filePath}` + '?' + this.timeStamp;
    }
    return `${environment.mediaUrl}/${this.filePath}`;
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
