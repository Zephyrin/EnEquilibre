import { LanguageService } from './language.service';
import { ViewTranslateHttpService } from './vîew-translate-http.service';
import { HttpClient } from '@angular/common/http';
import { ViewTranslate } from './../_models/view-translate';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ViewTranslateService {
  public loading = true;

  private translate$: ViewTranslate[] = [];
  constructor(
    private http: HttpClient,
    private service: ViewTranslateHttpService,
    private lang: LanguageService) {
    this.service.getAll(undefined).subscribe(data => {
      data.body.map(x => new ViewTranslate(x));
      if (data.body.length === 0) {
        this.http
          .get('/assets/default_config/view-translate.json')
          .subscribe((defaultView: any) => {
            defaultView.forEach(view => {
              this.translate$.push(new ViewTranslate(view));
            });
            this.loading = false;
          });
      } else {
        this.translate$ = data.body;
        this.loading = false;
      }
    });
  }

  public translate(name: string): string {
    if (this.loading) {

    }
    if (this.loading) { return 'loading'; }
    const trad = this.translate$.filter(x => x.key === name);
    if (trad.length === 0) {
      const vT = new ViewTranslate();
      vT.key = name;
      vT.translate = name;
      this.service.create(vT);
      return name;
    }
    if (trad[0].translate[this.lang.language]) { return trad[0].translate[this.lang.language]; }
    return trad[0].translate;
  }
}
