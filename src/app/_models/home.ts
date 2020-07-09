import { Mediaobject } from './mediaobject';
export class Home {
  id: number;
  background: Mediaobject;
  separator: Mediaobject;
  translations: any;
  title: any;
  subtitle: any;

  public constructor(home: Home = null) {
    if (home && home !== null) {
      this.id = home.id;
      if (home.background) {
        this.background = new Mediaobject(home.background);
      }
      if (home.separator) {
        this.separator = new Mediaobject(home.separator);
      }
      this.translations = home.translations;
      this.title = home.title;
      this.subtitle = home.subtitle;
    }
  }

  toJSON() {
    const data = {};
    if (this.id) { data[`id`] = this.id; }
    if (this.background) { data[`background`] = this.background; }
    if (this.separator) { data[`separator`] = this.separator; }
    if (this.title) { data[`title`] = this.title; }
    if (this.subtitle) { data[`subtitle`] = this.subtitle; }
    return data;
  }
}
