import { LanguageService } from './../../_services/language.service';
import { ViewTranslateService } from './../../_services/view-translate.service';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor(public vt: ViewTranslateService, public language: LanguageService) { }

  ngOnInit(): void {
  }

  getFranceFlag() {
    return `/assets/flag_of_france.png`;
  }

  getEnglishFlag() {
    return `assets/flag_of_english.png`;
  }

  select(lang: string) {
    this.language.changeLanguage(lang);
  }
}
