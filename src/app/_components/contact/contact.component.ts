import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    public contact: ContactService,
    public vt: ViewTranslateService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
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
}
