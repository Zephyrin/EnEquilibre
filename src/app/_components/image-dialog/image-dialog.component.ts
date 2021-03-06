import { MediaobjectService } from './../../_services/Mediaobject/mediaobject.service';
import { TranslateComponent } from './../helpers/translate/translate.component';
import { MediaobjectHttpService } from './../../_services/Mediaobject/mediaobject-http.service';
import { FormErrors } from './../../_helpers/form-error';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mediaobject } from './../../_models/mediaobject';
import { ViewTranslateService } from './../../_services/view-translate.service';
import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

import { Dimensions, ImageCroppedEvent, ImageTransform } from '@app/_interfaces/index';

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
  imageSrc: string;
  fileName: string;
  tabPosition = 0;
  edit = false;
  get f() { return this.form.controls; }

  // Image cropper
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  aspectRatio = undefined;
  maintainAspectRatio = false;
  format = 'png';

  constructor(
    public vt: ViewTranslateService,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mediaobject,
    private formBuilder: FormBuilder,
    private service: MediaobjectService,
    private http: MediaobjectHttpService) {
    this.service.selectedImg = data;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      filePathUser: [''],
      filePath: [''],
      image: [''],
      crop: this.formBuilder.group({
        topLeft: this.formBuilder.group({
          x: [''],
          y: ['']
        }),
        bottomRight: this.formBuilder.group({
          x: [''],
          y: ['']
        })
      }),
      rotate: ['']
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

  async onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.errors = new FormErrors();
      const [file] = event.target.files;
      this.fileName = file.name;
      this.format = file.name.split('.').pop();
      this.imageSrc = '';
      this.imageChangedEvent = event;
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
    }
  }

  // Image cropper function
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  loadImageBase64(base64Image: string) {
    // this.imageSrc = base64Image;

    this.form.patchValue({
      image: base64Image
    });
  }

  imageCropped($event: ImageCroppedEvent) {
    this.form.patchValue({
      crop:
      {
        topLeft:
        {
          x: $event.imagePosition.x1, y: $event.imagePosition.y1
        },
        bottomRight:
        {
          x: $event.imagePosition.x2, y: $event.imagePosition.y2
        }
      },
      rotate: this.canvasRotation
    });
    this.imageSrc = $event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {
  }

  loadImageFailed() {
    this.errors = new FormErrors();
    this.errors.hasFatalError = true;
    this.errors.fatalError = 'Unable to load this image. I don\'t know why!';
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  toggleMaintainAspectRatio() {
    this.maintainAspectRatio = !this.maintainAspectRatio;
  }

  crop(val): void {
    this.aspectRatio = val;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }
}
