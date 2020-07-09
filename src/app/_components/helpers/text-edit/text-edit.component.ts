import { Translate } from './../../../_models/translate';
import { TranslateComponent } from './../translate/translate.component';
import { ViewTranslateService } from './../../../_services/view-translate.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

interface EditTranslate {
  edit: boolean;
  get(name: string): any;
  update(name: string, translate: Translate);
}
@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss']
})
export class TextEditComponent implements OnInit {
  @ViewChild('input') input: TranslateComponent;

  @Input() placeholder: string;
  @Input() value: EditTranslate;
  @Input() field: string;
  @Input() title = false;
  get edit(): boolean {
    return this.edit$ && this.value.edit;
  }

  set edit(edit: boolean) {
    if (edit) {
      const trans = this.value.get('translations');
      this.input.value = { en: trans.en[this.field], fr: trans.fr[this.field] };
      this.input.focused = true;
    } else {
      const trans = this.input.value;
      const translations = this.value.get('translations');
      translations.en[this.field] = trans.en;
      translations.fr[this.field] = trans.fr;
      this.value.update(this.field, trans);
    }
    this.edit$ = edit;
  }
  private edit$ = false;

  constructor(public vt: ViewTranslateService) { }

  ngOnInit(): void {
  }

  getTranslation(): string {
    const val = this.value.get(this.field);
    if (val[this.vt.language]) {
      return val[this.vt.language];
    }
    return val;
  }

}
