import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public language = 'en';
  private currentLanguageSubject: BehaviorSubject<string>;

  constructor() {
    let lang = localStorage.getItem('language');
    if (lang === null || !lang) {
      lang = 'fr';
      localStorage.setItem('language', 'fr');
    }
    this.language = lang;
    this.currentLanguageSubject = new BehaviorSubject<string>(lang);
  }

  public get languageValue(): string {
    return this.currentLanguageSubject.value;
  }

  public changeLanguage(lang: string) {
    if (lang !== 'en' && lang !== 'fr') {
      return;
    }
    let reload = false;
    localStorage.setItem('language', lang);
    this.currentLanguageSubject.next(lang);
    if (this.language !== lang) {
      reload = true;
    }
    this.language = lang;
    if (reload) {
      location.reload();
    }
  }
}
