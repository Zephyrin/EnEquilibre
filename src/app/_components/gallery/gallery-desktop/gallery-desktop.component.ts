import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Gallery } from '@app/_models/gallery';
import { GalleryService } from '@app/_services/gallery/gallery.service';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { RemoveDialogComponent } from '@app/_components/helpers/remove-dialog/remove-dialog.component';
import { ImageDialogComponent } from '@app/_components/image-dialog/image-dialog.component';
import { Mediaobject } from '@app/_models/mediaobject';

@Component({
  selector: 'app-gallery-desktop',
  templateUrl: './gallery-desktop.component.html',
  styleUrls: ['./gallery-desktop.component.scss']
})
export class GalleryDesktopComponent implements OnInit, OnDestroy {
  @Input() gallery: Gallery;

  constructor(
    public service: GalleryService,
    public vt: ViewTranslateService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(
        ImageDialogComponent, { data: this.service.get(this.gallery, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(this.gallery, name, new Mediaobject(result.data));
        }
      });
    }
  }

  removePicture($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.data === true) {
          this.service.remove(this.gallery, name);
        }
      });
    }
  }

  addToCarrousel() {
    if (this.service.edit) {
      const dialogRef = this.dialog.open(
        ImageDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(this.gallery, 'medias', new Mediaobject(result.data));
        }
      });
    }
  }

  removeFromCarrousel(img: Mediaobject) {
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.data === true) {
          this.service.remove(this.gallery, 'medias', img);
        }
      });
    }
  }

  delete($event: any, gallery: Gallery) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result && result.data === true) {
          this.service.delete(gallery);
        }
      });
    }
  }

}
