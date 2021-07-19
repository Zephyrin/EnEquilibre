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
      this.oldValue = Object.assign({}, trans);
      if (typeof (trans) === 'string') {
        this.oldValueIsString = true;
        trans = { en: [], fr: [] };
        trans.en[this.field] = this.vt.language === 'en' ? this.value[this.field] : '';
        trans.fr[this.field] = this.vt.language === 'fr' ? this.value[this.field] : '';
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
  oldValue: any;
  oldValueIsString = false;
  constructor(public vt: ViewTranslateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
  }

  getTranslation(): string {
    const trans = this.service.get(this.value, 'translations');
    if (trans[this.vt.language]) {
      if (trans[this.vt.language][this.field]
        || trans[this.vt.language][this.field] === '') {
        if (trans[this.vt.language][this.field] === '') {
          return this.vt.translate('no.' + this.field);
        }
        if (this.edit$ || this.service.edit) {
          return trans[this.vt.language][this.field].substring(0, 25) + '...';
        }
        return trans[this.vt.language][this.field];
      }
    }
    const val = this.service.get(this.value, this.field);
    if (val[this.vt.language] || val[this.vt.language] === '') {
      if (val[this.vt.language] === '') {
        if (this.service.edit) { return this.vt.translate('no.' + this.field); }
        return '';
      }
      return val[this.vt.language];
    }
    if (val === '') {
      if (this.service.edit) { return this.vt.translate('no.' + this.field); }
    }
    return val;
  }

  onSubmit($event: any): void {
    $event.stopPropagation();
    this.edit = false;
    const trans = this.input.value;
    const translations = this.service.get(this.value, 'translations');
    translations.en[this.field] = trans.en;
    translations.fr[this.field] = trans.fr;
    this.service.update(this.value, this.field, trans);
  }

  edition($event: any) {
    $event.stopPropagation();
    this.edit = true;
  }

  stopEdition($event: any) {
    $event.stopPropagation();
    if (!this.oldValueIsString) { this.service.set(this.value, 'translation', this.oldValue); }
    this.edit = false;
  }
  stopPropagation($event: any) {
    $event.stopPropagation();
  }
}
