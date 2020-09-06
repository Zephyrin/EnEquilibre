import { Mediaobject } from './mediaobject';
export class About {
  id: number;
  background: Mediaobject;
  separator: Mediaobject;
  translations: any;
  about: any;
  comment: any;

  public constructor(about: About = null) {
    if (about && about !== null) {
      this.id = about.id;
      if (about.background) {
        this.background = new Mediaobject(about.background);
      }
      if (about.separator) {
        this.separator = new Mediaobject(about.separator);
      }
      this.translations = about.translations;
      this.about = about.about;
      this.comment = about.comment;
    }
  }
  public static create() { return new About(); }
  public static createCpy(about: About) { return new About(about); }

  toJSON() {
    const data = {};
    if (this.background) { data[`background`] = this.background.id; }
    if (this.background === null) { data[`background`] = null; }
    if (this.separator) { data[`separator`] = this.separator.id; }
    if (this.separator === null) { data[`separator`] = null; }
    if (this.about) { data[`about`] = this.about; }
    if (this.comment) { data[`comment`] = this.comment; }
    return data;
  }
}
