import { Mediaobject } from './../../../_models/mediaobject';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  parts: FormGroup;

  @Input()
  get value(): Mediaobject | null {
    const n = this.parts.value;
    const m = new Mediaobject();
    m.filePath = n;
    return m;
  }
  set value(media: Mediaobject | null) {
    media = media || new Mediaobject();
  }

  constructor(fb: FormBuilder) {
    this.parts = fb.group({
      filePath: [''],
      filePathUser: [''],
      image: ['']
    });
  }
}

