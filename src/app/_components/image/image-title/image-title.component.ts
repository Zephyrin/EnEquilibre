import { RemoveDialogComponent } from './../../helpers/remove-dialog/remove-dialog.component';
import { ImageDialogComponent } from './../../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Mediaobject } from './../../../_models/mediaobject';
import { ViewTranslateService } from './../../../_services/view-translate.service';
import { Component, OnInit, Input } from '@angular/core';

interface Service {
  edit: boolean;
  hasImage(name: string): boolean;
  hasError(name: string): boolean;
  hasTitleOrSubtitle(): boolean;
  getUrl(name: string): string;
  getDescription(name: string): string;
  border(name: string): boolean;
  onError(name: string): void;

  get(object: any, name: string): string;

  removeBackground(): void;
  updateBackground(media: Mediaobject): void;
}

@Component({
  selector: 'app-image-title',
  templateUrl: './image-title.component.html',
  styleUrls: ['./image-title.component.scss']
})
export class ImageTitleComponent implements OnInit {
  @Input() service: Service;
  @Input() name: string;
  @Input() titleName: string;
  @Input() subtitleName: string;

  constructor(
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(ImageDialogComponent, { data: this.service.get(undefined, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.updateBackground(new Mediaobject(result.data));
        }
      });
    }
  }

  removePicture($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(RemoveDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.data === true) {
            this.service.removeBackground();
          }
        }
      });
    }
  }

}
