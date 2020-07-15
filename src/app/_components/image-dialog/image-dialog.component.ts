import { MediaobjectService } from './../../_services/Mediaobject/mediaobject.service';
import { HttpParams } from '@angular/common/http';
import { TranslateComponent } from './../helpers/translate/translate.component';
import { MediaobjectHttpService } from './../../_services/Mediaobject/mediaobject-http.service';
import { FormErrors } from './../../_helpers/form-error';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mediaobject } from './../../_models/mediaobject';
import { ViewTranslateService } from './../../_services/view-translate.service';
import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('descriptionInput') descriptionInput: TranslateComponent;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  form: FormGroup;
  loading = false;
  submitted = false;
  errors = new FormErrors();
  imageSrc: SafeResourceUrl;
  fileName: string;
  tabPosition = 0;
  edit = false;
  get f() { return this.form.controls; }

  constructor(
    public vt: ViewTranslateService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mediaobject,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer,
    private service: MediaobjectService,
    private http: MediaobjectHttpService) {
    this.service.selectedImg = data;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      filePathUser: [''],
      filePath: [''],
      image: ['']
    });
    this.imageSrc = '';
  }

  ngAfterViewInit() {
    this.form.addControl('description', this.descriptionInput.parts);
    this.descriptionInput.parts.setParent(this.form);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.tabPosition === 0) {
      this.errors = new FormErrors();
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
      this.loading = true;
      this.manageImg();
    } else {
      this.dialogRef.close({ data: this.service.selectedImg });
    }
  }

  manageImg() {
    this.http.create(new Mediaobject(this.form.value))
      .subscribe(image => {
        this.endTransaction(new Mediaobject(image));
      }, (error: any) => {
        this.endTransactionError(error);
      });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileName = file.name;
      this.imageSrc = '';
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        this.form.patchValue({
          image: reader.result
        });
      };
    }
  }

  endTransaction(mediaObject: Mediaobject) {
    this.loading = false;
    this.submitted = false;
    this.dialogRef.close({ data: mediaObject });
  }

  endTransactionError(error) {
    this.loading = false;
    if (error) {
      this.errors.formatError(error);
    } else {
      this.errors = new FormErrors();
    }
  }

  clearError(key) {
    this.errors.clearError(key);
  }

  isSubmittedAndHasError(name: string) {
    return this.submitted && this.form && this.form.controls[name]
      && (this.form.controls[name].errors || this.errors.hasErrors[name]);
  }

  deleteLogo() {
    this.imageSrc = '';
    this.fileName = undefined;
    this.form.patchValue({ image: null });
    this.form.patchValue({ filePath: null });
    this.form.controls.image.markAsTouched();
    this.form.controls.filePath.markAsTouched();
  }

  updateMediasList(tabChangeEvent: MatTabChangeEvent): void {
    this.tabPosition = tabChangeEvent.index;
    if (tabChangeEvent.index > 0) {
      //TODO
      /* this.loading = true;
      const httpParams = new HttpParams();
      httpParams.append('noPagination', 'true');
      this.http.getAll(null).subscribe(response => {
        this.medias = response.body.map((x) => new Mediaobject(x));
        this.loading = false;
      }); */
    }
  }
}
