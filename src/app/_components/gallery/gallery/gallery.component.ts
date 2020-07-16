import { ActivatedRoute } from '@angular/router';
import { RemoveDialogComponent } from './../../helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from './../../../_models/mediaobject';
import { ImageDialogComponent } from './../../image-dialog/image-dialog.component';
import { Gallery } from './../../../_models/gallery';
import { MatDialog } from '@angular/material/dialog';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { GalleryService } from './../../../_services/gallery/gallery.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() gallery: Gallery;
  private fragment;

  constructor(
    public service: GalleryService,
    public vt: ViewTranslateService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {
    this.route.fragment.subscribe((fragment: string) => {
      this.fragment = fragment;
    });
  }

  ngOnInit(): void {
    if (!!this.fragment) {
      this.scroll(this.fragment);
    }
  }

  scroll(id) {
    setTimeout(() => {
      const elmnt = document.getElementById(id);
      if (elmnt !== null) {
        elmnt.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 500);

  }

  openDialog(name: string) {
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

  removePicture(name: string) {
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result.data === true) {
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
        if (result.data === true) {
          this.service.remove(this.gallery, 'medias', img);
        }
      });
    }
  }
}
