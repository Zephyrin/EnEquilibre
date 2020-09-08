import { Mediaobject } from './mediaobject';

export class Gallery {
  id: number;
  main: Mediaobject;
  separator: Mediaobject;
  showCase: Mediaobject;
  medias: Mediaobject[];
  translations: any;
  title: any;
  order: number;

  public constructor(gallery: Gallery = null) {
    if (gallery && gallery !== null) {
      this.id = gallery.id;
      this.medias = [];
      if (gallery.main) {
        this.main = new Mediaobject(gallery.main);
      }
      if (gallery.separator) {
        this.separator = new Mediaobject(gallery.separator);
      }
      if (gallery.showCase) {
        this.showCase = new Mediaobject(gallery.showCase);
      }
      if (gallery.medias) {
        gallery.medias.forEach(element => {
          this.medias.push(new Mediaobject(element));
        });
      }
      this.translations = gallery.translations;
      this.title = gallery.title;
      this.order = gallery.order;
    }
  }

  public static create() { return new Gallery(); }
  public static createCpy(gallery: Gallery) { return new Gallery(gallery); }

  toJSON() {
    const data = {};
    if (this.main) { data[`main`] = this.main.id; }
    if (this.main === null) { data[`main`] = null; }
    if (this.separator) { data[`separator`] = this.separator.id; }
    if (this.separator === null) { data[`separator`] = null; }
    if (this.showCase) { data[`showCase`] = this.showCase.id; }
    if (this.showCase === null) { data[`showCase`] = null; }
    if (this.title) { data[`title`] = this.title; }
    if (this.order >= 0) { data[`order`] = this.order; }
    if (this.medias) {
      data[`medias`] = [];
      this.medias.forEach(element => { data[`medias`].push(element.toJSON(true)); });
    }
    if (this.medias === null) { data[`medias`] = null; }
    return data;
  }
}
