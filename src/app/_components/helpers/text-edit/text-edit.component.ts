import { FormGroup, FormBuilder } from '@angular/forms';
import { Translate } from './../../../_models/translate';
import { TranslateComponent } from './../translate/translate.component';
import { ViewTranslateService } from './../../../_services/view-translate.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

interface EditTranslate {
  edit: boolean;
  get(object: any, name: string): any;
  update(object: any, name: string, translate: Translate);
  set(object: any, name: string, newValue: any);
}
@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss']
})
export class TextEditComponent implements OnInit {
  @ViewChild('input') input: TranslateComponent;

  @Input() area = false;
  @Input() placeholder: string;
  @Input() value: any;
  @Input() service: EditTranslate;
  @Input() field: string;
  @Input() title = false;

  form: FormGroup;
  get edit(): boolean {
    return this.edit$ && this.service.edit;
  }

  set edit(edit: boolean) {
    if (edit) {
      let trans = this.service.get(this.value, 'translations');
      if (typeof (trans) === 'string') {
        trans = { en: [], fr: [] };
        trans.en[this.field] = '';
        trans.fr[this.field] = '';
        this.service.set(this.value, 'translations', trans);
      }
      const t = { en: '', fr: '' };
      if (trans.en) { t.en = trans.en[this.field]; }
      if (trans.fr) { t.fr = trans.fr[this.field]; }
      this.input.value = t;
      this.input.focused = true;
    }
    this.edit$ = edit;
  }
  private edit$ = false;

  constructor(public vt: ViewTranslateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
  }

  getTranslation(): string {
    const trans = this.service.get(this.value, 'translations');
    if (trans[this.vt.language]) {
      if (trans[this.vt.language][this.field]) {
        return trans[this.vt.language][this.field];
      }
    }
    const val = this.service.get(this.value, this.field);
    if (val[this.vt.language]) {
      return val[this.vt.language];
    }
    return val;
  }

  onSubmit(): void {
    this.edit = false;
    const trans = this.input.value;
    const translations = this.service.get(this.value, 'translations');
    translations.en[this.field] = trans.en;
    translations.fr[this.field] = trans.fr;
    this.service.update(this.value, this.field, trans);
  }

}
