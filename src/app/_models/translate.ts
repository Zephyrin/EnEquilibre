export class Translate {
  en: string;
  fr: string;
  constructor(translate: Translate = null) {
    if (translate) {
      this.en = translate.en;
      this.fr = translate.fr;
    }
  }
}
