import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IService } from '@app/_services/iservice';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

export interface DialogData {
  service: IService;
}

@Component({
  selector: 'app-json-ld',
  templateUrl: './json-ld.component.html',
  styleUrls: ['./json-ld.component.scss']
})
export class JsonLdComponent implements OnInit, OnDestroy {
  service: IService;
  public form: FormGroup;
  afterUpdateSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<JsonLdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.service = data.service;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      json: ['', Validators.required]
    });
    this.form.patchValue(this.service.jsonLD);
    if (this.afterUpdateSubscription === undefined) {
      this.afterUpdateSubscription = this.service.endUpdate.subscribe(result => {
        if (result) {
          if (this.afterUpdateSubscription) {
            this.afterUpdateSubscription.unsubscribe();
            this.afterUpdateSubscription = undefined;
          }
          this.dialogRef.close();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.afterUpdateSubscription) { this.afterUpdateSubscription.unsubscribe(); this.afterUpdateSubscription = undefined; }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    if (this.form.invalid) {
      return;
    }
    this.service.createOrUpdateJSonLD(this.form.value);
  }

}
