import { Mediaobject } from '@app/_models/mediaobject';
import { ImageDialogComponent } from '@app/_components/image-dialog/image-dialog.component';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { RemoveDialogComponent } from '@app/_components/helpers/remove-dialog/remove-dialog.component';

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface ServiceInterface {
  edit: boolean;
  update(name: string, newValue: Mediaobject): void;
  remove(name: string): void;
}
@Component({
  selector: 'app-image-full-height',
  templateUrl: './image-full-height.component.html',
  styleUrls: ['./image-full-height.component.scss']
})
export class ImageFullHeightComponent implements OnInit {
  @Input() image: Mediaobject;
  @Input() service: ServiceInterface;
  @Input() name: string;
  constructor(
    public dialog: MatDialog,
    public vt: ViewTranslateService
  ) { }

  ngOnInit(): void {
  }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(
        ImageDialogComponent, { data: this.image });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(name, new Mediaobject(result.data));
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
          this.service.remove(name);
        }
      });
    }
  }
}
