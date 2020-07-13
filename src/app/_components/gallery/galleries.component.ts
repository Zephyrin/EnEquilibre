import { NewGalleryComponent } from './new-gallery/new-gallery.component';
import { RemoveDialogComponent } from '../helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from '../../_models/mediaobject';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ViewTranslateService } from '../../_services/view-translate.service';
import { GalleryService } from '../../_services/gallery/gallery.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Gallery } from '@app/_models';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  editTitle = false;
  constructor(
    public gallery: GalleryService,
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  addGallery() {
    if (this.gallery.edit) {
      const dialogRef = this.dialog.open(NewGalleryComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.gallery.updateOrCreate(new Gallery(result.data), undefined, undefined, undefined);
        }
      });
    }
  }
}
