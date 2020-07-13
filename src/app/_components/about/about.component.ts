import { RemoveDialogComponent } from './../helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from './../../_models/mediaobject';
import { ImageDialogComponent } from './../image-dialog/image-dialog.component';
import { ViewTranslateService } from './../../_services/view-translate.service';
import { AboutService } from './../../_services/about/about.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  editTitle = false;
  constructor(
    public about: AboutService,
    public vt: ViewTranslateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(name: string) {
    if (this.about.edit) {
      const dialogRef = this.dialog.open(ImageDialogComponent, { data: this.about.get(undefined, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (name === 'background') { this.about.updateBackground(new Mediaobject(result.data)); }
          else if (name === 'separator') { this.about.updateSeparator(new Mediaobject(result.data)); }
        }
      });
    }
  }

  removePicture(name: string) {
    if (this.about.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result.data === true) {
          if (name === 'background') { this.about.removeBackground(); }
          else if (name === 'separator') { this.about.removeSeparator(); }
        }
      });
    }
  }
}
