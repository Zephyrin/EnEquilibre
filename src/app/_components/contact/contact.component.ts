import { FormGroup, FormBuilder } from '@angular/forms';
import { RemoveDialogComponent } from './../helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from './../../_models/mediaobject';
import { ImageDialogComponent } from './../image-dialog/image-dialog.component';
import { ViewTranslateService } from './../../_services/view-translate.service';
import { ContactService } from './../../_services/contact/contact.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  editEmail = false;
  editTitle = false;
  form: FormGroup;
  constructor(
    public contact: ContactService,
    public vt: ViewTranslateService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});
  }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
    if (this.contact.edit) {
      const dialogRef = this.dialog.open(ImageDialogComponent, { data: this.contact.get(undefined, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (name === 'background') { this.contact.updateBackground(new Mediaobject(result.data)); }
          else if (name === 'separator') { this.contact.updateSeparator(new Mediaobject(result.data)); }
        }
      });
    }
  }

  removePicture($event: any, name: string) {
    $event.stopPropagation();
    if (this.contact.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.data === true) {
          if (name === 'background') { this.contact.removeBackground(); }
          else if (name === 'separator') { this.contact.removeSeparator(); }
        }
      });
    }
  }

  onSubmitEmail($event: any): void {
    $event.stopPropagation();
    this.editEmail = false;
    const email = this.input.nativeElement.value;
    this.contact.update(this.contact.contact, 'email', email);
  }

  editionEmail($event: any) {
    $event.stopPropagation();
    this.input.nativeElement.value = this.contact.contact.email;
    this.editEmail = true;
  }

  stopEdition($event: any) {
    $event.stopPropagation();
    this.editEmail = false;
  }
  stopPropagation($event: any) {
    $event.stopPropagation();
  }

  isEditEmail() {
    return this.contact.edit && this.editEmail;
  }

}
