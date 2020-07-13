import { TranslateComponent } from './../../helpers/translate/translate.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Gallery } from './../../../_models/gallery';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewTranslateService } from './../../../_services/view-translate.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewInit, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-gallery',
  templateUrl: './new-gallery.component.html',
  styleUrls: ['./new-gallery.component.scss']
})
export class NewGalleryComponent implements OnInit, AfterViewInit {
  @ViewChild('titleInput') titleInput: TranslateComponent;

  form: FormGroup;

  get f() { return this.form.controls; }

  constructor(
    public vt: ViewTranslateService,
    public dialogRef: MatDialogRef<NewGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Gallery,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    });
  }

  ngAfterViewInit() {
    this.form.addControl('title', this.titleInput.parts);
    this.titleInput.parts.setParent(this.form);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({ data: this.form.value });
  }

}
