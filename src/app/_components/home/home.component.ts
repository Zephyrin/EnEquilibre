import { GalleryService } from '@app/_services/gallery/gallery.service';
import { RemoveDialogComponent } from './../helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from '@app/_models/mediaobject';
import { ImageDialogComponent } from './../image-dialog/image-dialog.component';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { HomeService } from '@app/_services/home/home.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  editTitle = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public home: HomeService,
    public vt: ViewTranslateService,
    public galleries: GalleryService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
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

  removePicture($event: any, name: string) {
    $event.stopPropagation();
    if (this.home.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.data === true) {
            if (name === 'background') { this.home.removeBackground(); }
            else if (name === 'separator') { this.home.removeSeparator(); }
          }
        }
      });
    }
  }
}
