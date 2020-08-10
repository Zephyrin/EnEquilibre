import { NewGalleryComponent } from './new-gallery/new-gallery.component';
import { ViewTranslateService } from '../../_services/view-translate.service';
import { GalleryService } from '../../_services/gallery/gallery.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Gallery } from '@app/_models';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  editTitle = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
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
