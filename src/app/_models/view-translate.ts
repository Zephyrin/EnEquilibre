export class ViewTranslate {
  key: string;
  translate: string;
  translates: string[];

  constructor(view: ViewTranslate = null) {
    this.translates = [];
    if (view !== null && view) {
      this.key = view.key;
      this.translate = view.translate;
      if (view.translates) {
        view.translates.forEach(elt => {
          this.translates.push(elt);
        });
      }
    }
  }
}
