import { RemoveDialogComponent } from '@app/_components/helpers/remove-dialog/remove-dialog.component';
import { Mediaobject } from '@app/_models';
import { ImageDialogComponent } from '@app/_components/image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewTranslateService } from '@app/_services/view-translate.service';
import { Input } from '@angular/core';
import { IService } from '@app/_services/iservice';

export class EditComponent {
  @Input() service: IService;
  @Input() child: any;

  constructor(
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) { }

  openDialog($event: any, name: string) {
    $event.stopPropagation();
    if (this.service.edit) {
      const dialogRef = this.dialog.open(ImageDialogComponent, { data: this.service.get(undefined, name) });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.update(this.child, name, new Mediaobject(result.data));
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
            this.service.remove(this.child, name, null);
          }
        }
      });
    }
  }
}
