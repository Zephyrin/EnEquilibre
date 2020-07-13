import { ViewTranslateService } from './../../../_services/view-translate.service';
import { Translate } from '@app/_models/translate';
import { FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { Component, OnInit, Input, HostBinding, Optional, Self, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: TranslateComponent }],
})
export class TranslateComponent implements MatFormFieldControl<Translate>, OnDestroy {
  static nextId = 0;

  @ViewChild('enInput') enInput: ElementRef;
  @ViewChild('frInput') frInput: ElementRef;
  @Input() isArea = false;
  parts: FormGroup;
  stateChanges = new Subject<void>();
  get focused(): boolean {
    return this.focused$;
  }
  set focused(val: boolean) {
    if (!this.focused$ && val) {
      this.setFocus();
    }
    this.focused$ = val;
  }
  private focused$ = false;
  errorState = false;
  controlType = 'translate-input';

  @HostBinding() id = `translate-component-${TranslateComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';

  @Input()
  get value(): Translate | null {
    const n = this.parts.value;
    const t = new Translate(n);
    return t;
  }
  set value(t: Translate | null) {
    this.parts.patchValue({ en: t.en, fr: t.fr });
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this.placeholder$;
  }
  set placeholder(plh) {
    this.placeholder$ = plh;
    this.stateChanges.next();
  }
  private placeholder$: string;

  @Input()
  get required() {
    return this.required$;
  }
  set required(req) {
    this.required$ = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private required$ = false;

  @Input()
  get disabled(): boolean { return this.disabled$; }
  set disabled(value: boolean) {
    this.disabled$ = coerceBooleanProperty(value);
    this.disabled$ ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private disabled$ = false;

  get empty() {
    const n = this.parts.value;
    return (!n.en && this.vt.language === 'en') || (!n.fr && this.vt.language === 'fr');
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    fb: FormBuilder,
    private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>,
    public vt: ViewTranslateService,
    @Optional() @Self() public ngControl: NgControl) {
    this.parts = fb.group({
      en: [''],
      fr: ['']
    });
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  hasAll() {
    const n = this.parts.value;
    return n.en && n.fr;
  }

  private setFocus() {
    setTimeout(() => {
      const n = this.parts.value;
      if (!n.en && this.enInput) {
        this.enInput.nativeElement.focus();
      } else if (!n.fr && this.frInput) {
        this.frInput.nativeElement.focus();
      } else if (this.enInput) {
        this.enInput.nativeElement.focus();
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
