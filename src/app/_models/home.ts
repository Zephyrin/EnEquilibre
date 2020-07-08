import { Mediaobject } from './mediaobject';
export class Home {
  id: number;
  background: Mediaobject;
  separator: Mediaobject;
  translations: any;

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
    }
  }
}
