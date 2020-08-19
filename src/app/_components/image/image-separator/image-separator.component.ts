import { EditComponent } from './../../../_helpers/edit-component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input } from '@angular/core';
import { RemoveDialogComponent } from '@app/_components/helpers/remove-dialog/remove-dialog.component';
import { ImageDialogComponent } from '@app/_components/image-dialog/image-dialog.component';
import { Mediaobject } from '@app/_models/mediaobject';
import { ViewTranslateService } from '@app/_services/view-translate.service';

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

  removeSeparator(): void;
  updateSeparator(media: Mediaobject): void;
}

@Component({
  selector: 'app-image-separator',
  templateUrl: './image-separator.component.html',
  styleUrls: ['./image-separator.component.scss']
})
export class ImageSeparatorComponent extends EditComponent implements OnInit {
  @Input() name: string;
  constructor(
    public vt: ViewTranslateService,
    public dialog: MatDialog
  ) {
    super(vt, dialog);
  }

  ngOnInit(): void {
  }
}
