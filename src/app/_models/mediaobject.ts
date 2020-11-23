import { environment } from '@environments/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Mediaobject {
  id: number;
  description: any;
  filePath: string;
  protected img: ArrayBuffer;
  translations: any;
  error = false;
  get image(): ArrayBuffer {
    return this.img;
  }
  set image(image: ArrayBuffer) {
    this.img = image;
    this.timeStamp = (new Date()).getTime();
  }
  rotate: number;
  crop: Crop;
  public timeStamp: number;
  private lastWidth: number;
  constructor(mediaobject: Mediaobject = null) {
    if (mediaobject !== null && mediaobject !== undefined) {
      this.id = mediaobject.id;
      this.description = mediaobject.description;
      this.filePath = mediaobject.filePath;
      this.image = mediaobject.image;
      this.timeStamp = mediaobject.timeStamp;
      this.translations = mediaobject.translations;
      this.error = mediaobject.error ? true : false;
      if (mediaobject.crop) { this.crop = new Crop(mediaobject.crop); }
      if (mediaobject.rotate) { this.rotate = mediaobject.rotate; }
    } else {
      this.timeStamp = (new Date()).getTime();
    }
  }

  public url(width: number): string {
    if (width === undefined) {
      throw new Error('Width undefined');
    }
    if (this.lastWidth - 50 <= width && this.lastWidth + 50 >= width) {
      this.error = false;
      this.lastWidth = width;
    }
    let w$ = '';
    if (width < 400) { w$ += 'w_1000_'; }
    /* if (width < 1001 && width > 900) { w$ += 'w_1000_'; }
    else if (width < 901 && width > 800) { w$ += 'w_900_'; }
    else if (width < 801 && width > 700) { w$ += 'w_800_'; }
    else if (width < 701 && width > 600) { w$ += 'w_700_'; }
    else if (width < 601 && width > 500) { w$ += 'w_600_'; }
    else if (width < 501 && width > 400) { w$ += 'w_500_'; }
    else if (width < 401 && width > 300) { w$ += 'w_400_'; }
    else if (width < 301 && width > 200) { w$ += 'w_300_'; }
    else if (width < 201 && width > 100) { w$ += 'w_200_'; }
    else if (width < 101) { w$ += 'w_100_'; } */
    if (this.timeStamp) {
      return `${environment.mediaUrl}/${w$}${this.filePath}` + '?' + this.timeStamp;
    }
    return `${environment.mediaUrl}/${w$}${this.filePath}`;
  }

  public hasUrl(): boolean {
    return this.filePath !== undefined && !this.error;
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
    if (this.img) {
      data[`image`] = this.img;
    }
    if (this.description) { data[`description`] = this.description; }
    if (this.crop) {
      data[`crop`] = this.crop;
    }
    if (this.rotate) {
      data[`rotate`] = this.rotate;
    }
    return data;
  }
}

export class Crop {
  topLeft: Coord;
  bottomRight: Coord;

  constructor(crop: Crop) {
    this.topLeft = new Coord(crop.topLeft.x, crop.topLeft.y);
    this.bottomRight = new Coord(crop.bottomRight.x, crop.bottomRight.y);
  }
}
export class Coord {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
