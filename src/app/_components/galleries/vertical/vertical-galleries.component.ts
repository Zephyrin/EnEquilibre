import { NewGalleryComponent } from '@app/_components/gallery/new-gallery/new-gallery.component';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { GalleryService } from '@app/_services/gallery/gallery.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Gallery } from '@app/_models';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-vertical-galleries',
  templateUrl: './vertical-galleries.component.html',
  styleUrls: ['./vertical-galleries.component.scss']
})
export class VerticalGalleriesComponent implements OnInit {
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
