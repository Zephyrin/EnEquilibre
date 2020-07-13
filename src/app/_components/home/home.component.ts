import { GalleryService } from '@app/_services/gallery/gallery.service';
import { RemoveDialogComponent } from './../helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from '@app/_models/mediaobject';
import { ImageDialogComponent } from './../image-dialog/image-dialog.component';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { HomeService } from '@app/_services/home/home.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editTitle = false;
  constructor(
    public home: HomeService,
    public vt: ViewTranslateService,
    public galleries: GalleryService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(name: string) {
    if (this.home.edit) {
      const dialogRef = this.dialog.open(ImageDialogComponent, { data: this.home.get(undefined, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (name === 'background') { this.home.updateBackground(new Mediaobject(result.data)); }
          else if (name === 'separator') { this.home.updateSeparator(new Mediaobject(result.data)); }
        }
      });
    }
  }

  removePicture(name: string) {
    if (this.home.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result.data === true) {
          if (name === 'background') { this.home.removeBackground(); }
          else if (name === 'separator') { this.home.removeSeparator(); }
        }
      });
    }
  }
}
